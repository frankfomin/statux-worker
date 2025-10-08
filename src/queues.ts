import { Queue } from "bullmq";
import { redis } from "@/db/redis";

export const checkSiteQueue = new Queue("check-site", { connection: redis })