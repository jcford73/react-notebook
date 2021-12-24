import Role from '../models/role-model';
import User from '../models/user-model';
import { db } from './base-repository';

const roles = new Map();

export const selectAllUsers = async (select) => {
    return db(User, async ({ repo }) => { //
        return repo.getAll({ select });
    });
};

export const selectUserById = async (id, select) => {
    return db(User, async ({ repo }) => {
        const [user] = await repo.findByIds([id], select);
        return user;
    });
};

export const selectRole = async (roleName) => {
    if (!roles.has(roleName)) {
        await db(Role, async ({ repo }) => {
            const [role] = await repo.find({ where: { role: roleName } });
            roles.set(roleName, role);
        });
    }
    return roles.get(roleName);
};

export const selectUserByUsername = async (username, select) => {
    return db(User, async ({ repo }) => {
        const [x] = await repo.find({ where: { username }, select });
        return x;
    });
};

export const saveUser = async (user) => {
    return db(User, async ({ repo }) => {
        user = await repo.save(user);
        return user;
    });
};

export default {
    selectAllUsers,
    selectUserById,
    selectUserByUsername,
    saveUser,
    selectRole,
};
