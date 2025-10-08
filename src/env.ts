/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(config({
    path: path.resolve(
        process.cwd(),
    ),
}));

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
})

export type Tenv = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}

export default env!;
