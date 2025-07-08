import { createClient } from "@sanity/client";

console.info(
  "[sanity] - project id",
  process.env.STUDIO_PROJECT_ID,
  "[sanity] - dataset",
  process.env.STUDIO_DATASET,
);
export default createClient({
  projectId: process.env.STUDIO_PROJECT_ID,
  dataset: process.env.STUDIO_DATASET,
});
