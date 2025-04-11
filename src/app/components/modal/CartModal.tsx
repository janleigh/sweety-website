/* eslint-disable no-inline-comments */
interface CartItem {
	name: string;
	quantity: number;
	price: number;
	customizations?: {
		fillingFlavor?: string;
		topCreamFlavor?: string;
		coneFlavor?: string; // Only for Cone
		size?: string;
		toppings?: string[];
	};
}

interface CartModalProps {
	isOpen: boolean;
	items: CartItem[];
	onClose: () => void;
	onRemoveItem: (item: CartItem) => void; // Accept the full item
	onUpdateQuantity: (itemName: string, quantity: number) => void;
	onEditCustomizations: (item: CartItem) => void;
	onCheckout: () => void;
}

export function CartModal({
	isOpen,
	items,
	onClose,
	onRemoveItem,
	onUpdateQuantity,
	onEditCustomizations,
	onCheckout
}: CartModalProps) {
	if (!isOpen) return null;

	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-96 rounded-lg bg-white p-6">
				<h2 className="mb-4 text-xl font-bold">Your Cart</h2>
				{items.length === 0 ? (
					<p className="text-gray-500">Your cart is empty.</p>
				) : (
					<ul className="mb-4 max-h-64 overflow-y-auto">
						{items.map((item, index) => (
							<li key={index} className="mb-4">
								<div className="flex justify-between">
									<span>{item.name}</span>
									<span>₱{(item.price * item.quantity).toFixed(2)}</span>
								</div>
								<div className="text-sm text-gray-600">
									{item.customizations && (
										<>
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
										</>
									)}
								</div>
								<div className="flex items-center gap-2">
									<button
										className="rounded bg-gray-300 px-2 py-1"
										onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}
										disabled={item.quantity <= 1}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										className="rounded bg-gray-300 px-2 py-1"
										onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
									>
										+
									</button>
								</div>
								<div className="mt-2 flex justify-between">
									<button className="text-red-500 hover:underline" onClick={() => onRemoveItem(item)}>
										Remove
									</button>
									<button
										className="text-blue-500 hover:underline"
										onClick={() => onEditCustomizations(item)}
									>
										Edit
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
				<div className="flex justify-between font-bold">
					<span>Total:</span>
					<span>₱{totalPrice.toFixed(2)}</span>
				</div>
				<div className="mt-4 flex justify-between">
					<button className="rounded-lg bg-gray-300 px-4 py-2" onClick={onClose}>
						Close
					</button>
					{items.length > 0 && (
						<button className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white" onClick={onCheckout}>
							Checkout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default CartModal;
