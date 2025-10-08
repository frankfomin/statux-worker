import Redis from "ioredis"

export const redis = new Redis("rediss://default:ASg9AAIncDJjYzhkZDVhMWFhMjA0ZTA3YTA1Mjg0NjM5OTcyNTcwM3AyMTAzMDE@special-labrador-10301.upstash.io:6379", {
    maxRetriesPerRequest: null
});