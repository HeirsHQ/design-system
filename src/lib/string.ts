export const capitalize = (value: string | undefined) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const truncate = (value: string | undefined, length = 100) => {
  if (!value) return "";
  if (value.length <= length) return value;
  return value.slice(0, length) + "...";
};
