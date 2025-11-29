module.exports = {
  exportType: "default",
  ignore: ["**/node_modules/**", "**/.next/**"],
  logLevel: "error",
  additionalData: "",
  // DOC Deprecation warnings from typed-scss-modules using legacy Sass API are expected and harmless - if not resolved with dep updates, consider alternative approach
  implementation: "sass",
  quoteType: "single",
};
