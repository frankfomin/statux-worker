import { Worker } from "bullmq";
import { checkSiteQueue } from "./queues";
import { getUsersByPlan, logResult } from "./get-users-by-plan";
import { checkSite } from "./checksite";
import { redis } from "./db/redis";

const BATCH_SIZE = 100;

new Worker(
    "check-site",
    async job => {
        // if it's a "plan scheduler" job
        const plan = job.data.plan;
        if (plan) {
            const users = await getUsersByPlan(plan);

            for (let i = 0; i < users.length; i += BATCH_SIZE) {
                const batch = users.slice(i, i + BATCH_SIZE);

                // Enqueue individual checks
                for (const user of batch) {
                    await checkSiteQueue.add(
                        "single-check",
                        { url: user.url, userId: user.id },
                        {
                            attempts: 3,
                            backoff: { type: "exponential", delay: 5000 },
                            removeOnComplete: true,
                            removeOnFail: false,
                        }
                    );
                }
            }
            return;
        }

        // otherwise, it's an individual site check
        if (job.name === "single-check") {
            const { url, userId } = job.data;
            const result = await checkSite(url);
            await logResult(userId, url, result);
        }
    },
    {
        concurrency: 100, // how many checks to run in parallel
        connection: redis,
    }
);

console.log("Worker started ✅");
