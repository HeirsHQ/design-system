import * as fs from "node:fs";
import * as path from "node:path";
import { registry } from "../registry/registry";
import type { RegistryItem, RegistryIndex } from "../registry/schema";

const REGISTRY_URL = "https://heirshq.github.io/heirs-design-system";
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
        })
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

  // Copy registry.json to public folder
  const registryJsonPath = path.join(process.cwd(), "registry.json");
  if (fs.existsSync(registryJsonPath)) {
    const publicDir = path.join(process.cwd(), "public");
    fs.copyFileSync(registryJsonPath, path.join(publicDir, "registry.json"));
    console.log("✓ Copied registry.json");
  }

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
