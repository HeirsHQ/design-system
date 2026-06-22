#!/usr/bin/env node
/**
 * Converge App Scaffolder
 *
 * Generates a fresh standalone Next.js application pre-wired with the Converge
 * foundation: the @heirshq/design-system package (UI + form system), the typed
 * API client, react-query api-hook layer, sidebar/header shell (empty nav
 * config), user store, auth guard, app provider, error boundary and the
 * permission resolver.
 *
 * Usage:
 *   node scaffold-app.mjs <app-name>
 *   node scaffold-app.mjs acme-console --title "Acme Console" --dir ./apps
 *
 * Arguments:
 *   <app-name>   Kebab-case name, used for BOTH the folder and package name (required)
 *
 * Options:
 *   --title   Document title used in the root layout          (default: derived from name)
 *   --dir     Parent directory to create the app in           (default: cwd)
 *   --force   Allow writing into a non-empty target directory (default: false)
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, renameSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = join(__dirname, "templates", "converge-app");

// Parse: positional <app-name> plus --title/--dir options and the --force flag.
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
  fail("an app name is required.\n\n  Example: node scaffold-app.mjs acme-console");
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(NAME)) {
  fail(`app name must be kebab-case (lowercase letters, digits, dashes). Got: "${NAME}"`);
}

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

// npm strips a file literally named ".gitignore" on publish, so the template
// ships it as "gitignore"; restore the dot in the generated app.
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
replaceTokens("src/app/layout.tsx", { "{{APP_TITLE}}": TITLE });

const envExample = join(TARGET, "env.example");
const envFile = join(TARGET, ".env");
if (existsSync(envExample) && !existsSync(envFile)) {
  let env = readFileSync(envExample, "utf8");
  const secret = randomBytes(24).toString("hex");
  env = env.replace(/^NEXT_PUBLIC_ENCRYPTION_SECRET=.*$/m, `NEXT_PUBLIC_ENCRYPTION_SECRET=${secret}`);
  if (!/NEXT_PUBLIC_ENCRYPTION_SECRET=/.test(env)) {
    env += `\nNEXT_PUBLIC_ENCRYPTION_SECRET=${secret}\n`;
  }
  writeFileSync(envFile, env, "utf8");
}

console.log(`
${c.bold(c.green("OK"))} Scaffolded ${c.bold(NAME)} ${c.dim(`(${TITLE})`)}
${c.dim("-".repeat(60))}
  ${c.dim("at")} ${TARGET}
${c.dim("-".repeat(60))}
`);

console.log(`${c.bold("Included foundation:")}
  ${c.dim("-")} @heirshq/design-system wired in (UI + form system, Tailwind v4, shadcn config)
  ${c.dim("-")} Typed API client + service proxy (lib/client, app/api/proxy)
  ${c.dim("-")} react-query api hooks (lib/query: useApiQuery/usePaginatedQuery/useApiMutation)
  ${c.dim("-")} Sidebar + Header shell with empty navigation config (config/route)
  ${c.dim("-")} User store (zustand), auth guard (WithAuth), permission resolver (lib/permissions, lib/rbac)
  ${c.dim("-")} App provider, error boundary, inactivity handling
`);

console.log(`${c.bold("Next steps:")}\n`);
console.log(`  ${c.cyan(`cd ${NAME}`)}`);
console.log(`  ${c.cyan("pnpm install")}`);
console.log(`  ${c.dim("# set your *_SERVICE URLs in .env, then")}`);
console.log(`  ${c.cyan("pnpm dev")}\n`);
console.log(`${c.dim("Navigation is intentionally empty - populate ADMIN_ROUTES in")} ${c.yellow("src/config/route.ts")}.\n`);
