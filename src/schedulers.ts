import { Queue } from "bullmq";
import { redis } from "./db/redis";

const queue = new Queue('check-site', { connection: redis });

(async () => {
    await queue.add('every-30s', {}, { repeat: { every: 30 * 1000 } });
    await queue.add('every-1m', {}, { repeat: { every: 60 * 1000 } });
    await queue.add('every-5m', {}, { repeat: { every: 5 * 60 * 1000 } });
    console.log('Jobs scheduled!');
})();


