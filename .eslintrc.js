module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/arrow-spacing": "warn",
    "vue/block-spacing": ["warn", "always"],
    "vue/brace-style": ["warn", "1tbs"],
    // "camelcase": "warn",
    "vue/eqeqeq": "error",
    "vue/max-len": ["warn", 120],
    "max-lines": ["warn", 800],
    "max-params": ["warn", 5],
    "newline-before-return": "warn",
    "no-cond-assign": ["error", "always"],
    "no-console": "error",
    "vue/no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-else-return": "warn",
    "prefer-const": "warn",
    "vue/prefer-template": "warn",
    // quotes: ["error", "double"],
    "vue/semi": "off",
    "arrow-parens": ["warn", "always"],
    "vue/require-prop-types" : "off"
  },
};
