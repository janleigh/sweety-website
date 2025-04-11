import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
	id: number;
	username: string;
	cart: string;
	delivery_address: string;
	created_at: string;
}

export function AdminPanel() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch orders from the server
		fetch("http://localhost:3001/orders")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch orders.");
				}
				return response.json();
			})
			.then((data) => setOrders(data.orders))
			.catch((err) => setError(err.message));
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-screen w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
				<h1 className="mb-6 text-center text-3xl font-bold">Admin Panel</h1>
				{error && <p className="mb-4 text-center text-red-500">{error}</p>}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-100">
								<th className="border border-gray-300 px-4 py-2">Order ID</th>
								<th className="border border-gray-300 px-4 py-2">Username</th>
								<th className="border border-gray-300 px-4 py-2">Cart</th>
								<th className="border border-gray-300 px-4 py-2">Delivery Address</th>
								<th className="border border-gray-300 px-4 py-2">Date</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id}>
									<td className="border border-gray-300 px-4 py-2 text-center">{order.id}</td>
									<td className="border border-gray-300 px-4 py-2 text-center">{order.username}</td>
									<td className="border border-gray-300 px-4 py-2">
										<ul className="text-sm">
											{JSON.parse(order.cart).map((item: any, index: number) => (
												<li key={index} className="mb-2">
													<span className="font-semibold">{item.name}</span> - Quantity: {item.quantity}, Price: ₱
													{item.price.toFixed(2)}
													{item.customizations && (
														<ul className="ml-4 text-gray-600">
															{item.customizations.fillingFlavor && (
																<li>Filling Flavor: {item.customizations.fillingFlavor}</li>
															)}
															{item.customizations.topCreamFlavor && (
																<li>Top Cream Flavor: {item.customizations.topCreamFlavor}</li>
															)}
															{item.customizations.coneFlavor && (
																<li>Cone Flavor: {item.customizations.coneFlavor}</li>
															)}
															{item.customizations.size && <li>Size: {item.customizations.size}</li>}
															{item.customizations.toppings?.length > 0 && (
																<li>Toppings: {item.customizations.toppings.join(", ")}</li>
															)}
														</ul>
													)}
												</li>
											))}
										</ul>
									</td>
									<td className="border border-gray-300 px-4 py-2">
										<ul className="text-sm">
											{(() => {
												const address = JSON.parse(order.delivery_address);
												return (
													<li>
														<span className="font-semibold">
															{address.fullName} ({address.phoneNumber})
														</span>
														<br />
														{address.streetAddress}, {address.city}, {address.postalCode}
													</li>
												);
											})()}
										</ul>
									</td>
									<td className="border border-gray-300 px-4 py-2 text-center">
										{new Date(order.created_at).toLocaleString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-6 flex justify-end">
					<button
						className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white"
						onClick={() => navigate("/")}
					>
						Back to Main Page
					</button>
				</div>
			</div>
		</div>
	);
}

export default AdminPanel;
