import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-onboarding"],
  framework: "@storybook/react-vite",
  viteFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.base = "/design-system/storybook/";
    }
    return config;
  },
};
export default config;
