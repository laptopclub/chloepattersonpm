import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { env } from "../../../../lib/env";
import { sanityClient } from "../../../../lib/sanity";

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token: env.sanity.readToken ?? "" })
});
