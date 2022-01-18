module.exports = {
  content: ["./public/javascripts/*.js", "./views/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        fraktur: ["UnifrakturCook", "cursive"],
      },
      colors: {
        dark: "#151C1F",
        sidebar: "#172024",
        header: "#1b2529",
        light: "#F3EFEE",
        gray: "#7F847F",
        main: "#879385",
        brown: "#90826C",
        empty1: "#080d0f",
        empty2: "#0a0e0f",
      },
    },
  },
  plugins: [],
};
