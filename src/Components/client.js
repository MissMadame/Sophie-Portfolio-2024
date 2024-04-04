// sanity.js
import { createClient } from "@sanity/client";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "v12ll6j8",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-01-01",
  // unless you have caching for your front end, `useCdn` should be `true` for most production environments
});
