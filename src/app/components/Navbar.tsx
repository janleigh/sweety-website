/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inline-comments */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "./modal/LoginRegisterModal"; // Import the modal component

interface NavbarProps {
	onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
	const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

	// Check login state on component mount
	useEffect(() => {
		const storedLoginState = localStorage.getItem("isLoggedIn");
		if (storedLoginState === "true") {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		setIsLoggedIn(false); // Set login status to false
		localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
		localStorage.removeItem("username"); // Remove username from localStorage
		alert("You have been logged out.");
		window.location.reload();
	};

	return (
		<>
			<nav className="bg-rococo-rose-1 p-4 pt-4 text-white">
				<div className="container mx-auto flex items-center justify-between font-semibold">
					<ul className="flex gap-x-6">
						<li>
							<Link to="/" className="hover:text-rococo-orange">
								Home
							</Link>
						</li>
						<li>
							<Link to="/products" className="hover:text-rococo-orange">
								Products
							</Link>
						</li>
						<li>
							<Link to="/about" className="hover:text-rococo-orange">
								About
							</Link>
						</li>
					</ul>
					<div className="flex items-center gap-x-4">
						{isLoggedIn ? (
							<button
								className="rounded-lg bg-rococo-white px-4 py-2 font-bold text-rococo-rose-1 transition-transform hover:scale-105 hover:shadow-lg"
								onClick={handleLogout}
							>
								Logout
							</button>
						) : (
							<button
								className="rounded-lg bg-rococo-white px-4 py-2 font-bold text-rococo-rose-1 transition-transform hover:scale-105 hover:shadow-lg"
								onClick={() => setIsModalOpen(true)} // Open the modal
							>
								Login / Register
							</button>
						)}
						{isLoggedIn && (
							<Link to="/admin" className="hover:text-rococo-orange">
								<button
									className="rounded-lg bg-rococo-white px-4 py-2 font-bold text-rococo-rose-1 transition-transform hover:scale-105 hover:shadow-lg"
									onClick={onCartClick}
								>
									Admin Panel
								</button>
							</Link>
						)}
						<button
							className="rounded-lg bg-rococo-white px-4 py-2 font-bold text-rococo-rose-1 transition-transform hover:scale-105 hover:shadow-lg"
							onClick={onCartClick}
						>
							View Cart
						</button>
					</div>
				</div>
			</nav>

			{/* Render the Login/Register Modal */}
			<LoginRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default Navbar;
