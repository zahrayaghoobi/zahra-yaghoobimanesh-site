import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  await initOpenNextCloudflareForDev();
}

export default { reactStrictMode: true };
