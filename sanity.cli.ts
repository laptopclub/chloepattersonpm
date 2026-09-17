import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2d96josg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    dataset,
    projectId
  },
  deployment: {
    appId: "gzl5lsrx1bfgxa9jbgfr7h5a"
  },
  typegen: {
    generates: "./sanity.types.ts",
    path: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./node_modules/@laptopclub/foundation-cms/dist/**/*.{js,mjs,ts,tsx}"],
    schema: "./schema.json"
  }
});
