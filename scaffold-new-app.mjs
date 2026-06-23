#!/usr/bin/env node
/**
 * Heirs Bare App Scaffolder
 *
 * Generates a fresh, bare application pre-wired with @heirshq/design-system,
 * Tailwind v4 and shadcn config — no auth, providers, store or API layer.
 * Choose a Next.js (App Router) or a Vite + React setup.
 *
 * Usage:
 *   node scaffold-new-app.mjs <app-name>
 *   node scaffold-new-app.mjs my-app --template vite
 *   node scaffold-new-app.mjs my-app --template next --title "My App" --dir ./apps
 *
 * Arguments:
 *   <app-name>   Kebab-case name, used for BOTH the folder and package name (required)
 *
 * Options:
 *   --template  next | vite   Which starter to generate            (default: next)
 *   --title     Document title in the layout / index.html          (default: derived from name)
 *   --dir       Parent directory to create the app in              (default: cwd)
 *   --force     Allow writing into a non-empty target directory    (default: false)
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, renameSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TEMPLATES = {
  next: "next-app",
  vite: "vite-app",
};

// Parse: positional <app-name> plus --template/--title/--dir options and --force.
const argv = process.argv.slice(2);
const opts = { _: [] };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--force") opts.force = true;
  else if (a.startsWith("--")) opts[a.slice(2)] = argv[++i];
  else opts._.push(a);
}

const NAME = opts._[0] ?? opts.name;
const DIR = opts.dir ?? process.cwd();
const FORCE = !!opts.force;
const TEMPLATE = (opts.template ?? "next").toLowerCase();

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

const fail = (msg) => {
  console.error(`\n  ${c.bold("Error:")} ${msg}\n`);
  process.exit(1);
};

if (!NAME) {
  fail("an app name is required.\n\n  Example: node scaffold-new-app.mjs my-app --template next");
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(NAME)) {
  fail(`app name must be kebab-case (lowercase letters, digits, dashes). Got: "${NAME}"`);
}

if (!TEMPLATES[TEMPLATE]) {
  fail(`unknown --template "${TEMPLATE}". Choose one of: ${Object.keys(TEMPLATES).join(", ")}.`);
}

const TEMPLATE_DIR = join(__dirname, "templates", TEMPLATES[TEMPLATE]);
if (!existsSync(TEMPLATE_DIR)) {
  fail(`template directory not found at ${TEMPLATE_DIR}`);
}

const TITLE =
  opts.title ??
  NAME.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const TARGET = resolve(DIR, NAME);

if (existsSync(TARGET) && readdirSync(TARGET).length > 0 && !FORCE) {
  fail(`directory "${TARGET}" already exists and is not empty. Pass --force to write into it anyway.`);
}

mkdirSync(TARGET, { recursive: true });

cpSync(TEMPLATE_DIR, TARGET, { recursive: true });

// npm strips a file literally named ".gitignore" on publish, so templates ship
// it as "gitignore"; restore the dot in the generated app.
const giSrc = join(TARGET, "gitignore");
const giDst = join(TARGET, ".gitignore");
if (existsSync(giSrc) && !existsSync(giDst)) renameSync(giSrc, giDst);

const replaceTokens = (relPath, replacements) => {
  const file = join(TARGET, relPath);
  if (!existsSync(file)) return;
  let content = readFileSync(file, "utf8");
  for (const [token, value] of Object.entries(replacements)) {
    content = content.split(token).join(value);
  }
  writeFileSync(file, content, "utf8");
};

replaceTokens("package.json", { "{{APP_NAME}}": NAME });
replaceTokens("src/app/layout.tsx", { "{{APP_TITLE}}": TITLE }); // next
replaceTokens("index.html", { "{{APP_TITLE}}": TITLE }); // vite

const isVite = TEMPLATE === "vite";

console.log(`
${c.bold(c.green("OK"))} Scaffolded ${c.bold(NAME)} ${c.dim(`(${TITLE} · ${isVite ? "Vite + React" : "Next.js"})`)}
${c.dim("-".repeat(60))}
  ${c.dim("at")} ${TARGET}
${c.dim("-".repeat(60))}
`);

console.log(`${c.bold("Included:")}
  ${c.dim("-")} @heirshq/design-system (UI components)
  ${c.dim("-")} Tailwind v4 + shadcn config + design-system theme/styles
  ${c.dim("-")} ${isVite ? "Vite + React + TypeScript" : "Next.js App Router + TypeScript"}
  ${c.dim("-")} Nothing else — no auth, providers, store or API layer
`);

console.log(`${c.bold("Next steps:")}\n`);
console.log(`  ${c.cyan(`cd ${NAME}`)}`);
console.log(`  ${c.cyan("pnpm install")}`);
console.log(`  ${c.cyan(isVite ? "pnpm dev" : "pnpm dev")}\n`);
console.log(`${c.dim("Add design-system components:")} ${c.cyan('import { Button } from "@heirshq/design-system";')}\n`);
