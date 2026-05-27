/**
 * Formats a number as a localized currency string.
 * Pass an explicit `locale` and `currency` for non-default formatting.
 *
 * @example
 * ```ts
 * formatCurrency(1234.5)                              // => "$1.23K"
 * formatCurrency(1234.5, { display: "full" })         // => "$1,234.50"
 * formatCurrency(1234.5, { currency: "NGN", locale: "en-NG" })
 * ```
 */
export const formatCurrency = (amount = 0, options: { currency?: string; display?: "compact" | "full"; locale?: string } = {}) => {
  const { currency = "USD", display = "compact", locale = "en-US" } = options;
  return new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay: "narrowSymbol",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...(display === "compact" ? { notation: "compact", compactDisplay: "short" } : { notation: "standard" }),
  }).format(amount);
};
