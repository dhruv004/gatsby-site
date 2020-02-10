import Typography from "typography";

const typography = new Typography({
    baseFontSize: "18px",
    baseLineHeight: 1.45,
    headerFontFamily: ["Inconsolata", "serif"],
    bodyFontFamily: ["Inconsolata", "sans-serif"]
  });
  
  // Insert styles directly into the <head>
  typography.injectStyles();

export default typography;
