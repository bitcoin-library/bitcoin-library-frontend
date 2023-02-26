/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			gridTemplateColumns: {
        // Simple 16 column grid
        'results': 'repeat(auto-fit, minmax(224px, max-content))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      }}
	},
	plugins: [require("daisyui")]
};
