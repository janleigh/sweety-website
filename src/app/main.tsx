import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import App from "./pages/App";
import Checkout from "./pages/Checkout";
import AdminPanel from "./pages/AdminPanel";
import UnderConstruction from "./pages/UnderConstruction";
import About from "./pages/About";

import "./styles/index.css";

ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/admin" element={<AdminPanel />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<UnderConstruction />} />
		</Routes>
	</Router>,
	document.getElementById("root")
);
