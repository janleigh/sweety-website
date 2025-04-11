import { createApp, createRouter, toNodeListener, eventHandler, readBody } from "h3";
import { createServer } from "http";
import Database from "better-sqlite3";

const app = createApp();
const db = new Database("json.sqlite");

// Init db
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        cart TEXT DEFAULT '[]'
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        cart TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Fuck you CORS
app.use(
	eventHandler((event) => {
		const origin = event.node.req.headers.origin;

		if (origin) {
			event.node.res.setHeader("Access-Control-Allow-Origin", origin);
		}

		event.node.res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		event.node.res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		event.node.res.setHeader("Access-Control-Allow-Credentials", "true");

		if (event.node.req.method === "OPTIONS") {
			event.node.res.statusCode = 204;
			event.node.res.end();
		}
	})
);

const router = createRouter();
app.use(router);

// Register a new user
router.post(
	"/register",
	eventHandler(async (event) => {
		const { username, password } = await readBody(event);

		// Check if the username already exists
		const userExists = db.prepare("SELECT 1 FROM users WHERE username = ?").get(username);
		if (userExists) {
			return { status: 400, message: "Username already exists." };
		}

		// Add the new user
		db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, password);

		return { status: 201, message: "Registration successful." };
	})
);

// Login a user
router.post(
	"/login",
	eventHandler(async (event) => {
		const { username, password } = await readBody(event);

		// Check if the username and password match
		const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
		if (!user) {
			return { status: 401, message: "Invalid username or password." };
		}

		return { status: 200, message: "Login successful.", username };
	})
);

// Get cart for a user
router.get(
	"/cart",
	eventHandler((event) => {
		const url = new URL(event.node.req.url || "", `http://${event.node.req.headers.host}`);
		const username = url.searchParams.get("username");

		if (!username) {
			return { status: 400, message: "Username is required." };
		}

		// Retrieve the user's cart
		const user = db.prepare("SELECT cart FROM users WHERE username = ?").get(username);
		if (!user) {
			return { status: 404, message: "User not found." };
		}

		return { status: 200, cart: JSON.parse(user.cart) };
	})
);

// Update cart for a user
router.post(
	"/cart",
	eventHandler(async (event) => {
		const url = new URL(event.node.req.url || "", `http://${event.node.req.headers.host}`);
		const username = url.searchParams.get("username");

		if (!username) {
			return { status: 400, message: "Username is required." };
		}

		const { cart } = await readBody(event);

		// Update the user's cart
		const user = db.prepare("SELECT 1 FROM users WHERE username = ?").get(username);
		if (!user) {
			return { status: 404, message: "User not found." };
		}

		db.prepare("UPDATE users SET cart = ? WHERE username = ?").run(JSON.stringify(cart), username);

		return { status: 200, message: "Cart updated successfully." };
	})
);

// Endpoint to fetch all orders
router.get(
	"/orders",
	eventHandler(() => {
		const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
		return { status: 200, orders };
	})
);

// Endpoint to place an order
router.post(
	"/place-order",
	eventHandler(async (event) => {
		const { username, cart, deliveryAddress } = await readBody(event);

		if (!username || !cart || !deliveryAddress) {
			return { status: 400, message: "Username, cart, and delivery address are required." };
		}

		// Insert the order into the orders table
		db.prepare("INSERT INTO orders (username, cart, delivery_address) VALUES (?, ?, ?)").run(
			username,
			JSON.stringify(cart),
			JSON.stringify(deliveryAddress)
		);

		return { status: 201, message: "Order placed successfully." };
	})
);

// Start the server
const server = createServer(toNodeListener(app));
server.listen(3001, () => {
	console.log("Server is running on http://localhost:3001");
});
