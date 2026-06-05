#!/usr/bin/env node
/**
 * Converge MFE Scaffolder
 *
 * Usage:
 *   node scaffold-mfe.mjs --name converge-recruitment-mfe --port 4009
 *   node scaffold-mfe.mjs --name converge-recruitment-mfe --port 4009 --routes jobs,candidates,pipelines
 *
 * Options:
 *   --name     Full module name in the form "converge-{slug}-mfe"  (required)
 *   --port     Dev server port (required, 1025–65535)
 *   --routes   Comma-separated list of page route slugs            (default: overview)
 */

import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const get = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
};

const NAME = get("--name");
const PORT = get("--port");
const ROUTES_RAW = get("--routes");

if (!NAME || !PORT) {
  console.error("\n  Error: --name and --port are required.\n");
  console.error("  Example: node scaffold-mfe.mjs --name converge-recruitment-mfe --port 4009\n");
  process.exit(1);
}

if (!/^converge-[a-z0-9]+(-[a-z0-9]+)*-mfe$/.test(NAME)) {
  console.error(`\n  Error: name must match "converge-{slug}-mfe". Got: "${NAME}"\n`);
  process.exit(1);
}

const portNum = Number(PORT);
if (!Number.isInteger(portNum) || portNum < 1025 || portNum > 65535) {
  console.error(`\n  Error: port must be an integer between 1025 and 65535. Got: "${PORT}"\n`);
  process.exit(1);
}

// Derive helpers from NAME
const SLUG = NAME.replace(/^converge-/, "").replace(/-mfe$/, ""); // e.g. "recruitment"
const TITLE = SLUG.split("-")
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" "); // e.g. "Recruitment" / "App Builder"
const ENV_KEY = NAME.toUpperCase().replace(/-/g, "_"); // e.g. "CONVERGE_RECRUITMENT_MFE"
const ROUTES = ROUTES_RAW ? ROUTES_RAW.split(",").map((r) => r.trim()) : ["overview"];

const ROOT = resolve(process.cwd());
const WORKSPACE = join(ROOT, NAME); // mfe/converge-recruitment-mfe
const APP = join(WORKSPACE, NAME); // mfe/converge-recruitment-mfe/converge-recruitment-mfe

if (existsSync(WORKSPACE)) {
  console.error(`\n  Error: directory "${NAME}" already exists.\n`);
  process.exit(1);
}

const created = [];

function write(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
  created.push(filePath.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
}

write(
  join(WORKSPACE, "package.json"),
  `{
  "name": "${NAME}",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm nx serve ${NAME}",
    "build": "pnpm nx build ${NAME}",
    "typecheck": "pnpm nx typecheck ${NAME}",
    "lint": "pnpm nx lint ${NAME}",
    "lint:fix": "pnpm nx lint ${NAME} --fix",
    "format": "prettier --write \\"${NAME}/src/**/*.{ts,tsx}\\""
  },
  "dependencies": {
    "@module-federation/enhanced": "^2.1.0",
    "@tanstack/react-query": "^5.100.14",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.40.0",
    "lucide-react": "^1.16.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "6.30.3",
    "shadcn": "^4.8.3",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0",
    "zustand": "^5.0.13"
  },
  "devDependencies": {
    "@nx/js": "22.7.2",
    "@nx/module-federation": "22.7.2",
    "@nx/react": "22.7.2",
    "@nx/rspack": "22.7.2",
    "@nx/web": "22.7.2",
    "@rspack/cli": "1.6.8",
    "@rspack/core": "1.6.8",
    "@rspack/dev-server": "^1.1.4",
    "@rspack/plugin-react-refresh": "^1.0.0",
    "@swc-node/register": "1.11.1",
    "@swc/cli": "~0.8.0",
    "@swc/core": "1.15.8",
    "@swc/helpers": "0.5.18",
    "@tailwindcss/postcss": "^4.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "nx": "22.7.2",
    "postcss": "^8.5.15",
    "postcss-loader": "^8.2.1",
    "prettier": "^3.8.1",
    "react-refresh": "~0.14.0",
    "tailwindcss": "^4.3.0",
    "tslib": "^2.3.0",
    "typescript": "~5.9.2"
  }
}
`,
);

write(
  join(WORKSPACE, "nx.json"),
  `{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": ["default", "!{projectRoot}/.eslintrc.json", "!{projectRoot}/eslint.config.mjs"],
    "sharedGlobals": []
  },
  "plugins": [
    {
      "plugin": "@nx/js/typescript",
      "options": {
        "typecheck": { "targetName": "typecheck" },
        "build": {
          "targetName": "build",
          "configName": "tsconfig.lib.json",
          "buildDepsName": "build-deps",
          "watchDepsName": "watch-deps"
        }
      }
    },
    {
      "plugin": "@nx/rspack/plugin",
      "options": {
        "buildTargetName": "build",
        "serveTargetName": "serve",
        "serveStaticTargetName": "serve-static",
        "previewTargetName": "preview",
        "buildDepsTargetName": "build-deps",
        "watchDepsTargetName": "watch-deps"
      }
    },
    { "plugin": "@nx/eslint/plugin", "options": { "targetName": "lint" } }
  ],
  "generators": {
    "@nx/react": {
      "application": { "babel": true, "style": "none", "linter": "eslint", "bundler": "rspack" },
      "component": { "style": "none" },
      "library": { "style": "none", "linter": "eslint" }
    }
  },
  "targetDefaults": {
    "@nx/rspack:rspack": {
      "inputs": ["production", "^production"],
      "dependsOn": ["^build"],
      "cache": true
    }
  },
  "analytics": true
}
`,
);

write(
  join(WORKSPACE, "tsconfig.base.json"),
  `{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "importHelpers": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "resolvePackageJsonImports": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "es2022",
    "ignoreDeprecations": "6.0",
    "baseUrl": "."
  }
}
`,
);

write(
  join(WORKSPACE, "tsconfig.json"),
  `{
  "extends": "./tsconfig.base.json",
  "compileOnSave": false,
  "files": [],
  "references": [{ "path": "./${NAME}" }]
}
`,
);

write(
  join(APP, "components.json"),
  `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "#components",
    "utils": "#lib/utils",
    "ui": "#components/ui",
    "lib": "#lib",
    "hooks": "#hooks"
  },
  "iconLibrary": "lucide"
}
`,
);

write(
  join(APP, "project.json"),
  `{
  "name": "${NAME}",
  "$schema": "../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "${NAME}/src",
  "projectType": "application",
  "tags": [],
  "targets": {
    "serve": {
      "options": { "port": ${portNum} }
    }
  }
}
`,
);

write(
  join(APP, "module-federation.config.ts"),
  `import { ModuleFederationConfig } from "@nx/module-federation";

const SHARED_SINGLETONS = [
  "react",
  "react-dom",
  "react-router-dom",
  "@tanstack/react-query",
  "sonner",
  "zustand",
];

const config: ModuleFederationConfig = {
  name: "${NAME}",
  exposes: {
    "./Module": "./src/remote-entry.ts",
  },
  shared: (libraryName, defaultConfig) => {
    if (SHARED_SINGLETONS.some((s) => libraryName === s || libraryName.startsWith(\`\${s}/\`))) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};

export default config;
`,
);

write(
  join(APP, "rspack.config.ts"),
  `import { NxAppRspackPlugin } from "@nx/rspack/app-plugin.js";
import { NxReactRspackPlugin } from "@nx/rspack/react-plugin.js";
import { NxModuleFederationPlugin } from "@nx/module-federation/rspack.js";
import { join, resolve } from "path";
import { DefinePlugin } from "@rspack/core";
import { config as dotenvConfig } from "dotenv";

import config from "./module-federation.config";

dotenvConfig({ path: resolve(__dirname, "../.env"), override: true });

const nxEnvVars = Object.entries(process.env)
  .filter(([key]) => key.startsWith("NX_"))
  .reduce<Record<string, string>>((acc, [key, value]) => {
    acc[\`process.env.\${key}\`] = JSON.stringify(value ?? "");
    return acc;
  }, {});

export default {
  output: {
    path: join(__dirname, "../dist/${NAME}"),
    publicPath: "auto",
  },
  devServer: {
    port: ${portNum},
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Private-Network": "true",
    },
    historyApiFallback: {
      index: "/index.html",
      htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
    },
  },
  plugins: [
    new NxAppRspackPlugin({
      tsConfig: "./tsconfig.app.json",
      main: "./src/main.ts",
      index: "./src/index.html",
      baseHref: "/",
      styles: ["./src/styles.css"],
      postcssConfig: "./postcss.config.mjs",
      outputHashing: process.env["NODE_ENV"] === "production" ? "all" : "none",
      optimization: process.env["NODE_ENV"] === "production",
    }),
    new NxReactRspackPlugin({}),
    new NxModuleFederationPlugin({ config }, { dts: false }),
    new DefinePlugin(nxEnvVars),
  ],
};
`,
);

write(
  join(APP, "postcss.config.mjs"),
  `export default {
  plugins: { "@tailwindcss/postcss": {} },
};
`,
);

write(
  join(APP, "tsconfig.json"),
  `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowJs": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "lib": ["es2022", "dom", "dom.iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "files": [],
  "include": [],
  "references": [{ "path": "./tsconfig.app.json" }],
  "extends": "../tsconfig.base.json"
}
`,
);

write(
  join(APP, "tsconfig.app.json"),
  `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../dist/out-tsc",
    "types": ["node", "@nx/react/typings/cssmodule.d.ts", "@nx/react/typings/image.d.ts"]
  },
  "exclude": ["src/**/*.spec.ts", "src/**/*.test.ts", "src/**/*.spec.tsx", "src/**/*.test.tsx"],
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"]
}
`,
);

write(
  join(APP, "src/main.ts"),
  `import("./bootstrap").catch((err) => console.error(err));
`,
);

write(
  join(APP, "src/bootstrap.tsx"),
  `import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import App from "./app/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 3,
      retryDelay: (attempt) => attempt * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
`,
);

write(
  join(APP, "src/remote-entry.ts"),
  `export { default } from "./app/app";
`,
);

write(
  join(APP, "src/lib/client.ts"),
  `// HTTP client setup
`,
);

write(
  join(APP, "src/lib/query.ts"),
  `// Query helpers
`,
);

write(
  join(APP, "src/lib/utils.ts"),
  `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
);

write(
  join(APP, "src/lib/index.ts"),
  `export * from "./client";
export * from "./query";
export * from "./utils";
`,
);

write(
  join(APP, "src/types/app.ts"),
  `// App-level types
`,
);

write(
  join(APP, "src/types/query.ts"),
  `// Query types
`,
);

write(
  join(APP, "src/types/index.ts"),
  `export * from "./app";
export * from "./query";
`,
);

write(
  join(APP, "src/index.html"),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Converge — ${TITLE}</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div id="root"></div>
</body>
</html>
`,
);

write(
  join(APP, "src/styles.css"),
  `@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --font-manrope: "Manrope", sans-serif;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
}

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    font-family: var(--font-manrope);
    border-color: var(--color-border);
  }

  *:disabled {
    cursor: not-allowed;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-background);
    color: var(--color-foreground);
    overflow-x: hidden;
    width: 100%;
  }

  ::-ms-scrollbar,
  ::-webkit-scrollbar {
    display: none;
    width: 0px;
  }

  a,
  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    -webkit-text-fill-color: var(--color-foreground) !important;
    background-color: transparent !important;
    transition: background-color 5000s ease-in-out 0s;
  }
}
`,
);

const routeImports = ROUTES.map((r) => {
  const compName = r
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return `  { path: "${r === ROUTES[0] ? "" : r}", component: React.lazy(() => import("./pages/${r}")) },`;
}).join("\n");

write(
  join(APP, "src/routes.ts"),
  `import React from "react";

export const ROUTES = [
${routeImports}
];
`,
);

write(
  join(APP, "src/app/app.tsx"),
  `import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../routes";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {ROUTES.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Placeholder />} />
      </Routes>
    </Suspense>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold">${NAME}</p>
        <p className="text-muted-foreground mt-1 text-sm">port ${portNum} · ready for pages</p>
      </div>
    </div>
  );
}
`,
);

for (const route of ROUTES) {
  const compName = route
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const label = route
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  write(
    join(APP, `src/pages/${route}.tsx`),
    `export default function ${compName}() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">${label}</h1>
    </div>
  );
}
`,
  );
}

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

console.log(`
${bold(green("✓"))} Scaffolded ${bold(NAME)} on port ${bold(portNum)}
${dim("─".repeat(60))}
${created.map((f) => `  ${dim("+")} ${f}`).join("\n")}
${dim("─".repeat(60))}
`);

console.log(`${bold("1.")} Install dependencies:\n`);
console.log(`   ${cyan(`cd ${NAME} && pnpm install`)}\n`);

console.log(`${bold("2.")} Add to ${yellow("converge-shell-mfe/src/config/remotes.ts")}:\n`);
console.log(`   ${cyan(`"${NAME}": process.env["NX_${ENV_KEY}_URL"] ?? "http://localhost:${portNum}",`)}\n`);

console.log(`${bold("3.")} Add to ${yellow("converge-shell-mfe/module-federation.config.ts")} remotes array:\n`);
console.log(`   ${cyan(`["${NAME}", REMOTE_URLS["${NAME}"]],`)}\n`);

console.log(`${bold("4.")} Add to ${yellow("converge-shell-mfe/src/types/remotes.d.ts")}:\n`);
console.log(`   ${cyan(`declare module "${NAME}/Module" {`)}`);
console.log(`   ${cyan(`  import { ComponentType } from "react";`)}`);
console.log(`   ${cyan(`  const Module: ComponentType;`)}`);
console.log(`   ${cyan(`  export default Module;`)}`);
console.log(`   ${cyan(`}`)}\n`);

console.log(`${bold("5.")} Add to ${yellow("converge-shell-mfe/src/app/app.tsx")}:\n`);
const constName =
  SLUG.split("-")
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("") + "Module";
console.log(`   ${cyan(`const ${constName} = lazy(() => import("${NAME}/Module"));`)}`);
console.log(`   ${dim("// then inside <DashboardShell>:")}`);
console.log(`   ${cyan(`<Route path="/super-admin/${SLUG}/*" element={<Remote name="${NAME}"><${constName} /></Remote>} />`)}\n`);

console.log(`${bold("6.")} Start the dev server:\n`);
console.log(`   ${cyan(`cd ${NAME} && pnpm dev`)}\n`);
