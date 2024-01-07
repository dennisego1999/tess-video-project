/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				arialRounded: ['Arial Rounded MT Bold']
			},
			colors: {
				primary: {
					red: '#FF0000',
					yellow: '#E6E618',
					gray: '#707070'
				}
			}
		}
	},
	plugins: [require('tailwind-scrollbar-hide')]
};
