import { createBlockRegistry } from "@laptopclub/foundation-ui";
import { editorialBlockRegistryExtension } from "../components/editorial-blocks";

// Site-specific editorial renderers override selected Foundation defaults.
export const siteBlockRegistry = createBlockRegistry(editorialBlockRegistryExtension);
