export const dbConfig = {
    host: process.env.NOTEBOOK_DB_HOST || 'localhost',
    port: process.env.NOTEBOOK_DB_PORT || '5432',
    user: process.env.NOTEBOOK_DB_USER || 'root',
    password: process.env.NOTEBOOK_DB_PASSWORD || 'root',
    database: process.env.NOTEBOOK_DB_DATABASE || 'notebook',
    synchronize: true,
};

export const apiConfig = {
    host: process.env.NOTEBOOK_API_HOST || '0.0.0.0',
    port: process.env.NOTEBOOK_API_PORT || '10001',
    baseUrl: process.env.NOTEBOOK_API_BASEURL || '',
};

export const redisConfig = {
    socket: {
        host: process.env.NOTEBOOK_REDIS_HOST,
        port: process.env.NOTEBOOK_REDIS_PORT,
        family: process.env.NOTEBOOK_REDIS_IPFAMILY,
        path: process.env.NOTEBOOK_REDIS_PATH,
        connectTimeout: process.env.NOTEBOOK_REDIS_TIMEOUT,
        noDelay: ((process.env.NOTEBOOK_REDIS_NODELAY || '').toUpperCase() === 'FALSE') || undefined,
        keepAlive: process.env.NOTEBOOK_REDIS_KEEPALIVE,
    },
};

export const jwtConfig = {
    ttl: process.env.NOTEBOOK_JWT_TTL || 900,
    key: process.env.NOTEBOOK_JWT_KEY || '',
    impersonateKey: process.env.NOTEBOOK_JWT_IMPERSONATE_KEY || '',
};

export default {
    db: dbConfig,
    api: apiConfig,
    redis: redisConfig,
    jwt: jwtConfig,
};
