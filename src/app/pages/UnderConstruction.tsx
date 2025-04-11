import { useNavigate } from "react-router-dom";

export function UnderConstruction() {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-96 rounded-lg bg-white p-6 text-center shadow-lg">
				<h1 className="mb-4 text-3xl font-bold text-rococo-rose-1">Under Construction</h1>
				<p className="mb-6 text-gray-700">
					This page is currently under construction. Please check back later!
				</p>
				<button className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white" onClick={() => navigate("/")}>
					Back to Home
				</button>
			</div>
		</div>
	);
}

export default UnderConstruction;
