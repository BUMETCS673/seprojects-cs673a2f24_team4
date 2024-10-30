// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)',
      },
      boxShadow: {
        'custom': '0px 8px 24px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
