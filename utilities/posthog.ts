import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.POSTHOG_TOKEN!, {
  host: "https://us.i.posthog.com",
});

export { posthog };
