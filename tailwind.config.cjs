/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#5865F2FF',
				secondary: '#50555EFF',
				success: '#3BA55DFF',
				warning: '#FAA81AFF',
				danger: '#ED4245FF',
				dark: '#202225FF',
				gray: {
					900: '#202225',
					800: '#2f3136',
					700: '#36393f',
					600: '#4f545c',
					400: '#d4d7dc',
					300: '#e3e5e8',
					200: '#ebedef',
					100: '#f2f3f5'
				}
			}
		}
	},
	plugins: []
}
