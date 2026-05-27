export const capitalize = (value: string | undefined) => {
  if (!value) return "";
  if (value.length === 1) return value.toUpperCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const truncate = (value: string | undefined, length = 100) => {
  if (!value) return "";
  if (value.length <= length) return value;
  return value.slice(0, length) + "...";
};

/**
 * Returns initials from a full name (up to two parts).
 *
 * @example
 * ```ts
 * getInitials("Ada Lovelace") // => "AL"
 * getInitials("Grace Brewster Murray Hopper") // => "GB"
 * ```
 */
export const getInitials = (fullName?: string) => {
  if (!fullName) return "";
  let names = fullName.split(" ");
  if (names.length > 2) names = names.slice(0, 2);
  return names.map((word) => word.substring(0, 1)).join("");
};

export const fromKebabCase = (str?: string) => {
  if (!str) return "";
  return str.replace(/-/g, " ");
};

export const fromPascalCase = (str?: string) => {
  if (!str) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const fromCamelCase = (str?: string) => {
  if (!str) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};

export const fromSnakeCase = (str?: string) => {
  if (!str) return "";
  return str.replace(/_/g, " ");
};

export const toKebabCase = (str?: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/ /g, "-");
};

export const toPascalCase = (str?: string) => {
  if (!str) return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/ /g, "")
    .replace(/^./, (s) => s.toUpperCase());
};

export const toCamelCase = (str?: string) => {
  if (!str) return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/ /g, "")
    .replace(/^./, (s) => s.toLowerCase());
};

export const toSnakeCase = (str?: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/ /g, "_");
};
