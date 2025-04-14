import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";

export default withNuxt([
  ...eslintPluginTailwindCSS.configs["flat/recommended"],
  {
    rules: {
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "any",
          },
        },
      ],
    },
  },
]);
