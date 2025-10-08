import { Worker } from 'bullmq';
import { redis } from './db/redis';

const worker = new Worker(
    "check-site",
    async job => {
        console.log(`Running ${job.name} at ${new Date().toISOString()}`);
    },
    { connection: redis }
)