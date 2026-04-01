import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import reactCompiler from "eslint-plugin-react-compiler";
import sonarjs from "eslint-plugin-sonarjs";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    plugins: {
      "react-compiler": reactCompiler,
      sonarjs,
    },
    rules: {
      "no-console": "warn",

      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",

      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      "react-compiler/react-compiler": "warn",

      ...(sonarjs.configs.recommended.rules ?? {}),
      "sonarjs/no-commented-code": "off",
      "sonarjs/no-nested-conditional": "off",
      "sonarjs/todo-tag": "warn",
      "sonarjs/no-nested-functions": "off",
      "sonarjs/no-redundant-jump": "off",
      "sonarjs/slow-regex": "off",
      "sonarjs/prefer-single-boolean-return": "off",

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              importNames: ["default"],
              message:
                "Использование 'next/link' запрещено: используйте '@/shared/ui/Link'.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/ui/Link/Link.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);
