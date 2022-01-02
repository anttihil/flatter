module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        fraktur: ["UnifrakturCook", "cursive"],
      },
      screens: {
        smp: { max: "767px" },
      },
    },
    colors: {
      dark: "#151C1F",
      light: "#F3EFEE",
      gray: "#7F847F",
      main: "#879385",
      brown: "#90826C",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
