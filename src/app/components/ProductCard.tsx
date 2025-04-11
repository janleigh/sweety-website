interface ProductCardProps {
	name: string;
	price: number;
	imageSrc: string;
	slogan: string;
	onAddToCart: (name: string, price: number) => void;
}

export function ProductCard({ name, price, imageSrc, slogan, onAddToCart }: ProductCardProps) {
	return (
		<div className="flex items-center gap-4 rounded-lg bg-rococo-rose-2 p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
			<img src={imageSrc} alt={name} className="h-32 w-32 rounded-lg object-cover" />
			<div className="flex flex-col justify-between">
				<div>
					<h3 className="text-xl font-bold text-rococo-white">{name}</h3>
					<p className="text-sm text-rococo-white">{slogan}</p>
				</div>
				<div className="mt-4">
					<p className="text-lg font-semibold text-rococo-white">₱{price.toFixed(2)}</p>
					<button
						className="hover:bg-rococo-rose-3 mt-2 rounded-lg bg-rococo-white px-4 py-2 font-bold text-rococo-rose-1"
						onClick={() => onAddToCart(name, price)}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
