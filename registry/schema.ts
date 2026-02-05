export type RegistryItemType = "registry:ui" | "registry:lib" | "registry:hook" | "registry:theme" | "registry:block";

export interface RegistryItemFile {
  path: string;
  type: RegistryItemType;
  content?: string;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryItemFile[];
  tailwind?: {
    config?: Record<string, unknown>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  meta?: Record<string, unknown>;
}

export type Registry = RegistryItem[];

export interface RegistryIndex {
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: RegistryItemType;
    description?: string;
    dependencies?: string[];
    devDependencies?: string[];
    registryDependencies?: string[];
  }>;
}
