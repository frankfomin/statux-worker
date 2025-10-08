export async function getUsersByPlan(plan: string) {
    // Example: return from Postgres or Prisma
    return [
        { id: 1, url: "https://example.com" },
        { id: 2, url: "https://another.com" },
    ];
}

export async function logResult(userId: number, url: string, result: any) {
    console.log(`[${url}] ${result.status} (${result.latency}ms)`);
}
