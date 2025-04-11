import { useState } from "react";
import { UserService } from "../../services/UserService";

export function LoginRegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState("");

	if (!isOpen) return null;

	const handleLogin = async () => {
		try {
			const result = await UserService.login(username, password);
			if (result.message === "Login successful.") {
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("username", username);
				window.location.reload();
			} else {
				setMessage(result.message);
			}
		} catch (error) {
			setMessage("An error occurred during login. Please try again.");
			console.error(error);
		}
	};

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			setMessage("Passwords do not match.");
			return;
		}

		try {
			const result = await UserService.register(username, password);
			if (result === "Registration successful.") {
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("username", username);
				window.location.reload();
			} else {
				setMessage(result);
			}
		} catch (error) {
			setMessage("An error occurred during registration. Please try again.");
			console.error(error);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-96 rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-center text-2xl font-bold">{isLogin ? "Login" : "Register"}</h2>
				<div className="mb-4">
					<label className="mb-2 block font-semibold">Username</label>
					<input
						type="text"
						className="w-full rounded-lg border px-3 py-2"
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-semibold">Password</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							className="w-full rounded-lg border px-3 py-2"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							className="absolute right-3 top-2 text-sm text-gray-500"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				{!isLogin && (
					<div className="mb-4">
						<label className="mb-2 block font-semibold">Confirm Password</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								className="w-full rounded-lg border px-3 py-2"
								placeholder="Confirm your password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								type="button"
								className="absolute right-3 top-2 text-sm text-gray-500"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>
				)}
				{message && <p className="mb-4 text-center text-red-500">{message}</p>}
				<div className="flex justify-between">
					<button
						className="rounded-lg bg-gray-300 px-4 py-2"
						onClick={() => {
							setUsername("");
							setPassword("");
							setConfirmPassword("");
							setMessage("");
							onClose();
						}}
					>
						Close
					</button>
					<button
						className="rounded-lg bg-rococo-rose-1 px-4 py-2 text-white"
						onClick={isLogin ? handleLogin : handleRegister}
					>
						{isLogin ? "Login" : "Register"}
					</button>
				</div>
				<p className="mt-4 text-center text-sm">
					{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						className="font-semibold text-rococo-rose-1 hover:underline"
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin ? "Register" : "Login"}
					</button>
				</p>
			</div>
		</div>
	);
}

export default LoginRegisterModal;
