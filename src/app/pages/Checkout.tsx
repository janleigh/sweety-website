/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Checkout() {
	const location = useLocation();
	const navigate = useNavigate();
	const cartItems = location.state?.cartItems || [];
	const username = localStorage.getItem("username");

	const [paymentMethod, setPaymentMethod] = useState<string>("");
	const [deliveryAddress, setDeliveryAddress] = useState({
		fullName: "",
		phoneNumber: "",
		streetAddress: "",
		city: "",
		postalCode: ""
	});

	const handlePayment = async () => {
		if (!paymentMethod) {
			alert("Please select a payment method.");
			return;
		}

		if (
			!deliveryAddress.fullName ||
			!deliveryAddress.phoneNumber ||
			!deliveryAddress.streetAddress ||
			!deliveryAddress.city ||
			!deliveryAddress.postalCode
		) {
			alert("Please fill in all delivery address fields.");
			return;
		}

		if (!username) {
			alert("You must be logged in to place an order.");
			return;
		}

		try {
			// Send the order to the server
			const response = await fetch("http://localhost:3001/place-order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					cart: cartItems,
					deliveryAddress
				})
			});

			if (!response.ok) {
				throw new Error("Failed to place the order.");
			}

			alert(`Order placed successfully with ${paymentMethod}!`);
			navigate("/");
		} catch (error) {
			alert("An error occurred while placing the order. Please try again.");
			console.error(error);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-screen w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
				<h1 className="mb-6 text-center text-3xl font-bold">Checkout</h1>
				<div className="mb-6">
					<h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
					<ul className="mb-4 max-h-64 overflow-y-auto rounded-lg border p-4">
						{cartItems.map((item: any, index: any) => (
							<li key={index} className="mb-2">
								<div className="flex justify-between">
									<span>{item.name}</span>
									<span>₱{(item.price * item.quantity).toFixed(2)}</span>
								</div>
								{item.customizations && (
									<div className="text-sm text-gray-600">
										<p>Filling Flavor: {item.customizations.fillingFlavor || "None"}</p>
										<p>Top Cream Flavor: {item.customizations.topCreamFlavor || "None"}</p>
										{item.name === "Cone" && (
											<p>Cone Flavor: {item.customizations.coneFlavor || "None"}</p>
										)}
										<p>Size: {item.customizations.size || "None"}</p>
										<p>
											Toppings:{" "}
											{item.customizations.toppings?.length
												? item.customizations.toppings.join(", ")
												: "None"}
										</p>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>

				<div className="mb-6">
					<h2 className="mb-4 text-xl font-semibold">Delivery Address</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-2 block font-semibold">Full Name</label>
							<input
								type="text"
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Enter your full name"
								value={deliveryAddress.fullName}
								onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
							/>
						</div>
						<div>
							<label className="mb-2 block font-semibold">Phone Number</label>
							<input
								type="text"
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Enter your phone number"
								value={deliveryAddress.phoneNumber}
								onChange={(e) =>
									setDeliveryAddress({ ...deliveryAddress, phoneNumber: e.target.value })
								}
							/>
						</div>
						<div className="md:col-span-2">
							<label className="mb-2 block font-semibold">Street Address</label>
							<input
								type="text"
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Enter your street address"
								value={deliveryAddress.streetAddress}
								onChange={(e) =>
									setDeliveryAddress({ ...deliveryAddress, streetAddress: e.target.value })
								}
							/>
						</div>
						<div>
							<label className="mb-2 block font-semibold">City</label>
							<input
								type="text"
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Enter your city"
								value={deliveryAddress.city}
								onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
							/>
						</div>
						<div>
							<label className="mb-2 block font-semibold">Postal Code</label>
							<input
								type="text"
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Enter your postal code"
								value={deliveryAddress.postalCode}
								onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
							/>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
					<div className="flex flex-col gap-4">
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="paymentMethod"
								value="GCash"
								checked={paymentMethod === "GCash"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>
							GCash
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="paymentMethod"
								value="Cash on Delivery"
								checked={paymentMethod === "Cash on Delivery"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>
							Cash on Delivery (COD)
						</label>
					</div>
				</div>

				<div className="flex justify-end gap-4">
					<button className="rounded-lg bg-gray-300 px-4 py-2" onClick={() => navigate("/")}>
						Cancel
					</button>
					<button className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white" onClick={handlePayment}>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
