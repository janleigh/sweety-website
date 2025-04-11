import { useNavigate } from "react-router-dom";

export function About() {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-w-3xl rounded-lg bg-white p-6 shadow-lg">
				<h1 className="mb-4 text-center text-3xl font-bold text-rococo-rose-1">About Us</h1>
				<p className="mb-4 text-gray-700">
					Welcome to <span className="font-bold text-rococo-rose-1">SWEETY</span>, your one-stop shop for
					delicious treats and desserts! Our mission is to bring joy to your taste buds with our carefully
					curated selection of cones, sundaes, and more. Whether you're craving a classic cone or a
					customizable sundae, we've got you covered.
				</p>
				<p className="mb-4 text-gray-700">
					At <span className="font-bold text-rococo-rose-1">SWEETY</span>, we believe in quality, creativity,
					and customer satisfaction. Our treats are made with love and the finest ingredients to ensure every
					bite is a delightful experience.
				</p>
				<p className="mb-4 text-gray-700">
					Thank you for choosing <span className="font-bold text-rococo-rose-1">SWEETY</span>. We hope you
					enjoy your shopping experience with us!
				</p>
				<div className="flex justify-end">
					<button className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white" onClick={() => navigate("/")}>
						Back to Home
					</button>
				</div>
			</div>
		</div>
	);
}

export default About;
