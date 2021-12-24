import { createClient } from 'redis';
import { redisConfig } from '../../environment/environment';

const redisClient = (async () => {
    const client = createClient({
        socket: { redisConfig },
    });

    // eslint-disable-next-line no-console
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    return client;
})();

export const cacheStore = async (key, value, durationSeconds) => {
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    const client = await redisClient;
    client.set(key, value, {
        EX: durationSeconds,
    });
};

export const cacheRetrieve = async (key) => {
    const client = await redisClient;
    const value = await client.get(key);
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};

export const cacheDelete = async (key) => {
    const client = await redisClient;
    await client.del(key);
};
