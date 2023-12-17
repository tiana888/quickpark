import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default withMT(tailwindConfig);
