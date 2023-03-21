/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		// fontFamily: {
		// 	sans: ["inconsolata"]
		// },
		fontSize: {
      sm: '0.6rem',
      base: '0.8rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
		extend: {
			gridTemplateColumns: {
        // Simple 16 column grid
        'results': 'repeat(auto-fit, minmax(200px, max-content))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      }}
	},
	plugins: [require("daisyui")]
};
