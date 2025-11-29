module.exports = {
  // Export type: 'default' or 'named'
  // Using 'default' to handle reserved keywords like 'default' class name
  exportType: "default",
  // Ignore patterns
  ignore: ["**/node_modules/**", "**/.next/**"],
  // Log level
  logLevel: "error",
  // Additional options
  additionalData: "",
  // Implementation: 'sass' or 'sass-embedded'
  // DOC: typed-scss-modules uses legacy Sass JS API internally, which causes deprecation warnings
  // These warnings are harmless and do not affect functionality
  // They will be resolved when typed-scss-modules updates to use the modern Sass API
  // See: https://sass-lang.com/d/legacy-js-api
  implementation: "sass",
  // Quote class names to handle reserved keywords
  quoteType: "single",
};
