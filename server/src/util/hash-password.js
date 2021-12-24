import { randomBytes, scryptSync } from 'crypto';

export const hashPassword = (password) => {
    const salt = randomBytes(32).toString('hex');
    const hash = scryptSync(password, salt, 64, { cost: 1024 }).toString('hex');
    return `${salt}:${hash}`;
};

export const comparePassword = (password, stored) => {
    const [salt, hash] = stored.split(':');
    const testHash = scryptSync(password, salt, 64, { cost: 1024 }).toString('hex');
    return testHash === hash;
};
