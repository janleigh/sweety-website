/* eslint-disable no-inline-comments */
import { useState } from "react";

interface Customization {
	fillingFlavor?: string;
	topCreamFlavor?: string;
	coneFlavor?: string; // Only for "Cone"
	size?: string;
	toppings?: string[];
}

interface CustomizationModalProps {
	isOpen: boolean;
	itemName: string;
	initialCustomizations: Customization;
	onClose: () => void;
	onSave: (customizations: Customization) => void;
}

export function CustomizationModal({
	isOpen,
	itemName,
	initialCustomizations,
	onClose,
	onSave
}: CustomizationModalProps) {
	const [customizations, setCustomizations] = useState<Customization>(initialCustomizations);
	const [error, setError] = useState<string>("");

	if (!isOpen) return null;

	const handleSave = () => {
		// Check if required fields are filled
		if (
			!customizations.fillingFlavor ||
			!customizations.topCreamFlavor ||
			(itemName === "Cone" && !customizations.coneFlavor) ||
			!customizations.size
		) {
			setError("Please fill in all required fields.");
			return;
		}

		setError("");
		onSave(customizations);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-96 rounded-lg bg-white p-6">
				<h2 className="mb-4 text-xl font-bold">Customize {itemName}</h2>
				{error && <p className="mb-4 text-center text-red-500">{error}</p>}
				<div className="mb-4">
					<label className="mb-2 block font-semibold">
						Filling Flavor <span className="text-red-500">*</span>
					</label>
					<select
						className="w-full rounded-lg border px-3 py-2"
						value={customizations.fillingFlavor || ""}
						onChange={(e) => setCustomizations({ ...customizations, fillingFlavor: e.target.value })}
					>
						<option value="">Select Filling Flavor</option>
						<option value="Chocolate">Chocolate</option>
						<option value="Vanilla">Vanilla</option>
						<option value="Mocha">Mocha</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-semibold">
						Top Cream Flavor <span className="text-red-500">*</span>
					</label>
					<select
						className="w-full rounded-lg border px-3 py-2"
						value={customizations.topCreamFlavor || ""}
						onChange={(e) => setCustomizations({ ...customizations, topCreamFlavor: e.target.value })}
					>
						<option value="">Select Top Cream Flavor</option>
						<option value="Whipped Cream">Whipped Cream</option>
						<option value="Chocolate Cream">Chocolate Cream</option>
						<option value="Caramel Cream">Caramel Cream</option>
					</select>
				</div>
				{itemName === "Cone" && (
					<div className="mb-4">
						<label className="mb-2 block font-semibold">
							Cone Flavor <span className="text-red-500">*</span>
						</label>
						<select
							className="w-full rounded-lg border px-3 py-2"
							value={customizations.coneFlavor || ""}
							onChange={(e) => setCustomizations({ ...customizations, coneFlavor: e.target.value })}
						>
							<option value="">Select Cone Flavor</option>
							<option value="Regular Cone">Regular Cone</option>
							<option value="Chocolate Tipped Cone">Chocolate Tipped Cone</option>
							<option value="Marshmallow Cone">Marshmallow Cone</option>
							<option value="Crushed Cookies Cone">Crushed Cookies Cone</option>
						</select>
					</div>
				)}
				<div className="mb-4">
					<label className="mb-2 block font-semibold">
						Size <span className="text-red-500">*</span>
					</label>
					<select
						className="w-full rounded-lg border px-3 py-2"
						value={customizations.size || ""}
						onChange={(e) => setCustomizations({ ...customizations, size: e.target.value })}
					>
						<option value="">Select Size</option>
						<option value="Small">Small (₱20)</option>
						<option value="Medium">Medium (₱35)</option>
						<option value="Large">Large (₱50)</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-semibold">Toppings</label>
					<input
						type="text"
						className="w-full rounded-lg border px-3 py-2"
						placeholder="Comma-separated (e.g., Sprinkles, Nuts)"
						value={customizations.toppings?.join(", ") || ""}
						onChange={(e) =>
							setCustomizations({
								...customizations,
								toppings: e.target.value.split(",").map((t) => t.trim())
							})
						}
					/>
				</div>
				<div className="flex justify-end gap-4">
					<button className="rounded-lg bg-gray-300 px-4 py-2" onClick={onClose}>
						Cancel
					</button>
					<button className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white" onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default CustomizationModal;
