module.exports = {
  content: ["./public/javascripts/*.js", "./views/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        fraktur: ["UnifrakturCook", "cursive"],
      },
      colors: {
        dark: "#151C1F",
        light: "#F3EFEE",
        gray: "#7F847F",
        main: "#879385",
        brown: "#90826C",
      },
    },
  },
  plugins: [],
};
