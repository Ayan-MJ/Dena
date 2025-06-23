import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "viteFinal": async (config) => {
    // Suppress "use client" directive warnings in Storybook
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        external: [],
        onwarn(warning, warn) {
          // Ignore "use client" directive warnings and sourcemap warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
              warning.message?.includes('sourcemap') ||
              warning.message?.includes('original location of error')) {
            return;
          }
          warn(warning);
        }
      };
      // Completely disable sourcemaps to prevent build warnings
      config.build.sourcemap = false;
      config.build.minify = false; // Also disable minification to reduce warnings
    }
    
    // Disable sourcemaps in development too
    config.css = {
      ...config.css,
      devSourcemap: false
    };
    
    // Set environment to production to reduce warnings
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': '"production"'
    };
    
    return config;
  }
};
export default config;