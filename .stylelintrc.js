module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
  ],
  rules: {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]*$",
    // DOC Disabled: We use @use instead of @import, partial extensions are handled by Sass
    "scss/at-import-partial-extension": null,
    // DOC Disabled: We use @use instead of @import, partial extensions are handled by Sass
    "scss/at-import-partial-extension-blacklist": null,
    // DOC Disabled: Dynamic property names in mixins (#{$property}) generate valid CSS but stylelint can't statically analyze them - this is a false positive
    "no-invalid-position-declaration": null,
  },
};

