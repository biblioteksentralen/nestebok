import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  prettier,
  {
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "import/no-anonymous-default-export": "off",
    },
  },
]);
