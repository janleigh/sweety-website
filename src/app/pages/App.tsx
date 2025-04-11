/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartModal from "../components/modal/CartModal";
import CustomizationModal from "../components/modal/CustomizationModal";
import ProductCard from "../components/ProductCard";
import { UserService } from "../services/UserService";

export function App() {
	// State management
	const [cartItems, setCartItems] = useState<
		{ name: string; quantity: number; price: number; customizations?: any }[]
	>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState<{ name: string; price: number; customizations?: any } | null>(null);
	const [username] = useState<string | null>(localStorage.getItem("username"));

	const navigate = useNavigate();

	// Fetch cart from the server when the user logs in
	useEffect(() => {
		if (username) {
			UserService.getCart(username)
				.then((cart) => setCartItems(cart))
				.catch((error) => console.error("Failed to fetch cart:", error));
		}
	}, [username]);

	// Save cart to the server whenever it changes
	useEffect(() => {
		if (username) {
			UserService.updateCart(username, cartItems).catch((error) => {
				console.error("Failed to update cart in the database:", error);
			});
		}
	}, [cartItems, username]);

	// Remove item from cart
	const removeFromCart = (itemToRemove: { name: string; customizations?: any }) => {
		setCartItems((prevItems) =>
			prevItems.filter(
				(item) =>
					!(
						item.name === itemToRemove.name &&
						JSON.stringify(item.customizations) === JSON.stringify(itemToRemove.customizations)
					)
			)
		);
	};

	// Update item quantity in cart
	const updateCartQuantity = (itemName: string, quantity: number) => {
		setCartItems((prevItems) =>
			prevItems.map((item) => (item.name === itemName ? { ...item, quantity: Math.max(1, quantity) } : item))
		);
	};

	// Open customization modal
	const openCustomizationModal = (itemName: string, price: number) => {
		setCurrentItem({ name: itemName, price, customizations: {} });
		setIsCustomizationOpen(true);
	};

	// Edit customizations
	const editCustomizations = (item: any) => {
		setCurrentItem(item);
		setIsCustomizationOpen(true);
	};

	// Save updated customizations
	const saveCustomizations = (customizations: any) => {
		if (currentItem) {
			setCartItems((prevItems) => {
				// Remove the previous entry for the same item
				const filteredItems = prevItems.filter(
					(item) =>
						!(
							item.name === currentItem.name &&
							JSON.stringify(item.customizations) === JSON.stringify(currentItem.customizations)
						)
				);

				// Add the updated item to the cart
				const updatedItem = {
					name: currentItem.name,
					price: calculatePrice(currentItem.name, currentItem.price, customizations),
					quantity: 1,
					customizations
				};

				return [...filteredItems, updatedItem];
			});
		}
		setIsCustomizationOpen(false);
	};

	// Helper function to calculate price
	const calculatePrice = (itemName: string, basePrice: number, customizations: any) => {
		let price = basePrice;

		// Calculate price based on size
		if (customizations?.size) {
			if (itemName === "Cone") {
				if (customizations.size === "Small") price = 20;
				else if (customizations.size === "Medium") price = 35;
				else if (customizations.size === "Large") price = 50;
			} else if (itemName === "Sundae") {
				if (customizations.size === "Small") price = 20;
				else if (customizations.size === "Medium") price = 45;
				else if (customizations.size === "Large") price = 60;
			}
		}

		// Add 5 pesos for each topping
		if (customizations?.toppings?.length) {
			price += customizations.toppings.length * 5;
		}

		return price;
	};

	// Proceed to checkout
	const proceedToCheckout = () => {
		navigate("/checkout", { state: { cartItems } });
	};

	return (
		<div id="app">
			{/* Navbar */}
			<div className="bg-rococo-rose-1">
				<Navbar onCartClick={() => setIsCartOpen(true)} />
				<div className="p-8">
					<h1 className="mb-4 mt-8 text-center text-4xl font-bold text-rococo-white">
						<a className="sweety-logo">SWEETY.</a>
					</h1>
					<h2 className="mb-4 text-center text-2xl font-semibold text-rococo-white">
						<a>Delicious treats just a click away.</a>
					</h2>
				</div>
			</div>

			{/* Featured Products */}
			<section className="p-4 sm:p-8">
				<h3 className="mb-6 text-center text-3xl font-bold text-rococo-rose-2 drop-shadow-[0_0_4px_#F1B5FF]">
					Featured Products
				</h3>
				<div className="mx-auto my-12 flex max-w-screen-lg flex-wrap justify-center gap-8">
					<ProductCard
						name="Cone"
						price={20}
						imageSrc="/img/products/cone.jpg"
						slogan="A classic treat for everyone."
						onAddToCart={openCustomizationModal}
					/>
					<ProductCard
						name="Sundae"
						price={20}
						imageSrc="/img/products/sundae.png"
						slogan="Indulge in creamy goodness."
						onAddToCart={openCustomizationModal}
					/>
				</div>
			</section>

			{/* Cart Modal */}
			<CartModal
				isOpen={isCartOpen}
				items={cartItems}
				onClose={() => setIsCartOpen(false)}
				onRemoveItem={(item) => removeFromCart(item)}
				onUpdateQuantity={updateCartQuantity}
				onEditCustomizations={editCustomizations}
				onCheckout={proceedToCheckout}
			/>

			{/* Customization Modal */}
			<CustomizationModal
				isOpen={isCustomizationOpen}
				itemName={currentItem?.name || ""}
				initialCustomizations={currentItem?.customizations || {}}
				onClose={() => setIsCustomizationOpen(false)}
				onSave={saveCustomizations}
			/>

			{/* Footer */}
			<footer className="bg-rococo-rose-1 p-6 text-center text-rococo-white">
				<div className="mb-4">
					<h3 className="text-lg font-bold">Contact Us</h3>
					<p>Email: support@sweety.com</p>
					<p>Phone: +639094863566</p>
				</div>
				<p className="mt-4">Made with 💗 by Joy Recievell Dagohoy</p>
			</footer>
		</div>
	);
}

export default App;
