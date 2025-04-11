/* eslint-disable @typescript-eslint/no-explicit-any */
export class UserService {
	static async register(username: string, password: string): Promise<string> {
		const response = await fetch("http://localhost:3001/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();
		return data.message;
	}

	static async login(username: string, password: string): Promise<{ message: string; username?: string }> {
		const response = await fetch("http://localhost:3001/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();
		return data;
	}

	static async getCart(username: string): Promise<any[]> {
		// Use query parameters to pass the username
		const response = await fetch(`http://localhost:3001/cart?username=${username}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to fetch cart.");
		}

		const data = await response.json();
		return data.cart || [];
	}

	static async updateCart(username: string, cart: any[]): Promise<string> {
		// Use query parameters to pass the username
		const response = await fetch(`http://localhost:3001/cart?username=${username}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cart })
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to update cart.");
		}

		const data = await response.json();
		return data.message;
	}
}
