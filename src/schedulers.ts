import { checkSiteQueue } from "./queues";


const intervalJobs = [
    { name: "plan-30s", time: 30 * 1000, plan: "30s" },
    { name: "plan-1m", time: 60 * 1000, plan: "1m" },
    { name: "plan-5m", time: 5 * 60 * 1000, plan: "5m" },
];

for (const job of intervalJobs) {
    await checkSiteQueue.add(
        job.name,
        { plan: job.plan },
        {
            repeat: { every: job.time },
            removeOnComplete: true,
        }
    )
}

console.log("Scheduler started ✅");



