/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#FFF5F5",
					100: "#FFE8E8",
					200: "#FFD1D1",
					300: "#FFA8A8",
					400: "#FF7A7A",
					500: "#FF5252",
					600: "#E63946",
					700: "#C62828",
					800: "#A01F1F",
					900: "#7A1818",
				},
				secondary: {
					50: "#FFF9F0",
					100: "#FFF0DB",
					200: "#FFE0B8",
					300: "#FFCA8A",
					400: "#FFB05C",
					500: "#FF9635",
					600: "#F57C00",
					700: "#E65100",
					800: "#C44100",
					900: "#9E3400",
				},
				accent: {
					50: "#FFFBF0",
					100: "#FFF6DB",
					200: "#FFEDB8",
					300: "#FFE28A",
					400: "#FFD75C",
					500: "#FFCC35",
					600: "#FFC107",
					700: "#F9A825",
					800: "#F57F17",
					900: "#E65100",
				},
				neutral: {
					50: "#FAFAFA",
					100: "#F5F5F5",
					200: "#EEEEEE",
					300: "#E0E0E0",
					400: "#BDBDBD",
					500: "#9E9E9E",
					600: "#757575",
					700: "#616161",
					800: "#424242",
					900: "#1A1A1A",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ["Playfair Display", "serif"],
			},
			borderRadius: {
				xl: "0.75rem",
				"2xl": "1rem",
				"3xl": "1.5rem",
			},
			boxShadow: {
				soft: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
				medium:
					"0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
				strong:
					"0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
				glow: "0 0 0 3px rgba(255, 82, 82, 0.1)",
			},
			spacing: {
				18: "4.5rem",
				88: "22rem",
			},
		},
	},
	plugins: [],
}
