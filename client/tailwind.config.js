/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
    "./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1200px',
		},
		extend: {
			colors: {
				primary: '#1c1c22',
				accent: {
					DEFAULT: '#00ff99',
					hover: '#00e187',
				},
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
