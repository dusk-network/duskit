module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    // The components use BEM class names and --_ for private custom properties.
    "custom-property-pattern": /^_?[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
    "selector-class-pattern":
      /^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*){0,2}$/,
  },
};
