module.exports = {
  darkMode: "class",
  content: ["../*.html", "../patna/*.html"],
  theme: { extend: {
    colors: {"primary":"#0D3B36","primary-container":"#134E48","on-primary":"#ffffff","secondary":"#059669","secondary-container":"#10B981","secondary-light":"#ECFDF5","surface":"#FAFAF9","surface-subtle":"#F4F6F4","surface-container":"#EAEFEA","on-surface":"#192823","on-surface-variant":"#4B5E57","status-success":"#059669"},
    fontFamily: {sans: ["Plus Jakarta Sans","sans-serif"]}
  }},
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};
