/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Poppins", "sans-serif"]
		},
		extend: {
			colors: {
				"rococo-rose-1": "#FFB5C0",
				"rococo-rose-2": "#FFA294",
				"rococo-orange": "#F5C8B5",
				"rococo-lavender": "#F1B5FF",
				"rococo-white": "#F9F9F9"
			}
		}
	},
	plugins: []
};
