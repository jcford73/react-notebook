import { pick } from 'lodash';
import { hashPassword } from '../../util/hash-password';
import User from '../../models/user-model';
import userRepo from '../../repository/users-repository';
import { addNote } from '../note/note-service'; // eslint-disable-line import/no-cycle

export const getUserById = async (id) => {
    return userRepo.selectUserById(id);
};

export const usernameInUse = async (username, ignoreUserId) => {
    const user = await userRepo.selectUserByUsername(username, ['id']);
    return (user && user.id !== ignoreUserId);
};

export const saveUser = async (userData, userId) => {
    let user = userData.id && await getUserById(userData.id);
    if (userData.id && !user) {
        throw Error('not-found');
    }
    if (userData.id && userId && user.id !== userId) {
        throw Error('unauthorized');
    }
    if (userData.id !== await usernameInUse(userData.username, user && user.id)) {
        throw Error('username-conflict');
    }
    const userRole = await userRepo.selectRole('user');
    user = new User({
        ...user,
        ...userData,
        ...hashPassword(userData.password),
        roles: [userRole],
    });
    user = await userRepo.saveUser(user);
    user.notes = [await addNote({ title: 'My First Note', description: '', body: 'Welcome! Thanks for checking this out!' }, user.id)];
    return pick(user, 'id', 'username', 'displayName', 'roles', 'notes');
};
