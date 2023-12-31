/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				'ten':'#F2B600',
				'thirty':'#404C80',
				'sixty':'#00030F',
			},
			dropShadow:{
				'text':'0px 2px 2px #0005',
				'border-text':'0 0 1px #000'
			},
			fontFamily:{
				'Merry':'Merriweather',
				'Merry-Sans':'Merriweather Sans'
			}
		},
	},
	plugins: [],
}
