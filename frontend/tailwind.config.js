/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#F0F5F4",
					100: "#D9E8E5",
					200: "#B3D1CB",
					300: "#8DBAB1",
					400: "#67A397",
					500: "#2F6B5F", // Dark teal/green
					600: "#265548",
					700: "#1E4036",
					800: "#152B24",
					900: "#0D1612",
				},
				secondary: {
					50: "#FFF5F5",
					100: "#FFE8E8",
					200: "#FFD1D1",
					300: "#FFBABA",
					400: "#FF9999",
					500: "#8B1538", // Maroon/burgundy
					600: "#6E1029",
					700: "#520C1F",
					800: "#350814",
					900: "#1A040A",
				},
				accent: {
					50: "#FFFEF5",
					100: "#FFFCE6",
					200: "#FFF9CC",
					300: "#FFF5B3",
					400: "#FFF199",
					500: "#D4AF37", // Gold
					600: "#B8962E",
					700: "#9C7D25",
					800: "#80641C",
					900: "#644B13",
				},
				neutral: {
					50: "#FFF9F5", // Cream
					100: "#FFF5ED",
					200: "#FFEBD9",
					300: "#FFE1C6",
					400: "#FFD7B3",
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
