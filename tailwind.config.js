/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					red: '#FF0000',
					yellow: '#E6E618'
				}
			}
		}
	},
	plugins: [require('tailwind-scrollbar-hide')]
};
