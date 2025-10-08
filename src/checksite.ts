export async function checkSite(url: string) {
    const start = Date.now();
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);

        return {
            status: res.ok ? "up" : "down",
            code: res.status,
            latency: Date.now() - start,
        };
    } catch {
        return {
            status: "down",
            code: null,
            latency: null,
        };
    }
}
