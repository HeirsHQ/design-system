import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-onboarding"],
  framework: "@storybook/react-vite",
  viteFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.base = process.env.STORYBOOK_BASE_PATH ?? "/";
    }
    return config;
  },
};
export default config;
