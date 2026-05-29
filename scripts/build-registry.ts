import * as fs from "node:fs";
import * as path from "node:path";

import type { RegistryItem, RegistryIndex } from "../registry/schema";
import { registry } from "../registry/registry";

const REGISTRY_URL = "https://heirshq.github.io/design-system";
const OUTPUT_DIR = path.join(process.cwd(), "public", "r");
const SRC_DIR = path.join(process.cwd(), "src");

async function buildRegistry() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const index: RegistryIndex = {
    name: "heirs-design-system",
    homepage: REGISTRY_URL,
    items: registry.map((item) => ({
      name: item.name,
      type: item.type,
      description: item.description,
      dependencies: item.dependencies,
      devDependencies: item.devDependencies,
      registryDependencies: item.registryDependencies,
    })),
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "index.json"), JSON.stringify(index, null, 2));
  console.log("✓ Built index.json");

  for (const item of registry) {
    const output: RegistryItem = {
      ...item,
      files: await Promise.all(
        item.files.map(async (file) => {
          const filePath = path.join(SRC_DIR, file.path);
          let content = "";

          if (fs.existsSync(filePath)) {
            content = fs.readFileSync(filePath, "utf-8");
            content = transformImports(content, file.path);
          } else {
            console.warn(`Warning: File not found: ${filePath}`);
          }

          return {
            ...file,
            content,
            target: getTargetPath(file.path),
          };
        }),
      ),
    };

    const outputPath = path.join(OUTPUT_DIR, `${item.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`✓ Built ${item.name}.json`);
  }

  const stylesOutput = {
    name: "heirs-design-system",
    type: "registry:style",
    cssVars: {
      light: {
        "primary-50": "240 100% 98%",
        "primary-100": "240 95% 94%",
        "primary-200": "240 90% 88%",
        "primary-300": "240 85% 78%",
        "primary-400": "240 80% 65%",
        "primary-500": "240 75% 55%",
        "primary-600": "240 70% 45%",
        "primary-700": "240 65% 38%",
        "primary-800": "240 60% 30%",
        "primary-900": "240 55% 22%",
      },
      dark: {
        "primary-50": "240 20% 15%",
        "primary-100": "240 25% 20%",
        "primary-200": "240 30% 28%",
        "primary-300": "240 35% 38%",
        "primary-400": "240 45% 50%",
        "primary-500": "240 55% 60%",
        "primary-600": "240 65% 70%",
        "primary-700": "240 75% 78%",
        "primary-800": "240 85% 86%",
        "primary-900": "240 95% 94%",
      },
    },
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "styles.json"), JSON.stringify(stylesOutput, null, 2));
  console.log("✓ Built styles.json");

  const publicDir = path.join(process.cwd(), "public");

  // Copy registry.json to public folder
  const registryJsonPath = path.join(process.cwd(), "registry.json");
  if (fs.existsSync(registryJsonPath)) {
    fs.copyFileSync(registryJsonPath, path.join(publicDir, "registry.json"));
    console.log("✓ Copied registry.json");
  }
  const componentCount = registry.length;
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Heirs Design System — Registry</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f9fafb; color: #111827; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2.5rem; max-width: 580px; width: 100%; }
    .badge { display: inline-block; background: #fef2f2; color: #991b1b; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 999px; margin-bottom: 1.25rem; }
    h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
    .subtitle { color: #6b7280; font-size: 0.95rem; margin-bottom: 2rem; }
    .stat { font-size: 0.875rem; color: #374151; margin-bottom: 1.75rem; }
    .stat strong { color: #111827; }
    h2 { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 0.6rem; }
    .tabs { display: flex; gap: 0; border-bottom: 1px solid #e5e7eb; margin-bottom: 0; }
    .tab { padding: 0.4rem 0.85rem; font-size: 0.8rem; font-weight: 500; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; background: none; border-top: none; border-left: none; border-right: none; }
    .tab.active { color: #111827; border-bottom-color: #111827; }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .code-wrap { background: #f3f4f6; border-radius: 0 8px 8px 8px; padding: 0.875rem 1rem; font-family: "Menlo", "Monaco", monospace; font-size: 0.82rem; color: #1f2937; word-break: break-all; margin-bottom: 1.5rem; }
    .code-block { background: #f3f4f6; border-radius: 8px; padding: 0.875rem 1rem; font-family: "Menlo", "Monaco", monospace; font-size: 0.82rem; color: #1f2937; word-break: break-all; margin-bottom: 1.5rem; }
    .links { display: flex; gap: 1rem; flex-wrap: wrap; }
    .links a { font-size: 0.85rem; color: #2563eb; text-decoration: none; }
    .links a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">shadcn/ui compatible</span>
    <h1>Heirs Design System</h1>
    <p class="subtitle">A component registry for internal use at Heirs Technologies.</p>
    <p class="stat"><strong>${componentCount}</strong> components available</p>

    <h2>Add a component</h2>
    <div class="tabs">
      <button class="tab active" onclick="switchTab(event, 'npx')">npx</button>
      <button class="tab" onclick="switchTab(event, 'pnpm')">pnpm</button>
      <button class="tab" onclick="switchTab(event, 'yarn')">yarn</button>
      <button class="tab" onclick="switchTab(event, 'bun')">bun</button>
    </div>
    <div id="npx" class="tab-panel active"><div class="code-wrap">npx shadcn add ${REGISTRY_URL}/r/[component-name].json</div></div>
    <div id="pnpm" class="tab-panel"><div class="code-wrap">pnpm dlx shadcn add ${REGISTRY_URL}/r/[component-name].json</div></div>
    <div id="yarn" class="tab-panel"><div class="code-wrap">yarn dlx shadcn add ${REGISTRY_URL}/r/[component-name].json</div></div>
    <div id="bun" class="tab-panel"><div class="code-wrap">bunx shadcn add ${REGISTRY_URL}/r/[component-name].json</div></div>

    <h2>Registry index</h2>
    <div class="code-block">${REGISTRY_URL}/r/index.json</div>
    <div class="links">
      <a href="${REGISTRY_URL}/storybook/">Storybook →</a>
      <a href="${REGISTRY_URL}/r/index.json">Browse registry →</a>
      <a href="https://github.com/HeirsHQ/heirs-design-system">GitHub →</a>
    </div>
  </div>
  <script>
    function switchTab(e, id) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      document.getElementById(id).classList.add('active');
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, "index.html"), indexHtml);
  console.log("✓ Built index.html");

  console.log(`\n✅ Registry built successfully to ${OUTPUT_DIR}`);
}

function transformImports(content: string, filePath: string): string {
  let transformed = content;
  transformed = transformed.replace(/from ["']\.\.\/lib\/utils\.js["']/g, 'from "@/lib/utils"');
  transformed = transformed.replace(/from ["']\.\.\/icons\/([^"']+)\.js["']/g, 'from "@/components/ui/icons/$1"');
  transformed = transformed.replace(/from ["']\.\/([^"']+)\.js["']/g, 'from "@/components/ui/$1"');

  return transformed;
}

function getTargetPath(srcPath: string): string {
  if (srcPath.startsWith("lib/")) {
    return srcPath.replace("lib/", "lib/");
  }
  if (srcPath.startsWith("icons/")) {
    return srcPath.replace("icons/", "components/ui/icons/");
  }
  if (srcPath.startsWith("components/")) {
    return srcPath.replace("components/", "components/ui/");
  }
  if (srcPath.startsWith("hooks/")) {
    return srcPath.replace("hooks/", "hooks/");
  }
  return srcPath;
}

buildRegistry().catch(console.error);
