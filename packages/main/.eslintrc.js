module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "prettier"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    quotes: [0, "single"], // 禁用引号检查	引号类型 `` "" ''
    semi: 0, // 禁用分号检查	[1, "always"]: 需要分号, [2, "never"]: 不加分号, 0: 禁用此项
    "vue/html-self-closing": "off",
    indent: "off", // 禁用缩进检查
    // allowEmptyCatch: true,
    "generator-star-spacing": "off",
    "space-before-function-paren": 0,
    "prettier/prettier": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
