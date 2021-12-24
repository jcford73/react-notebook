import { comparePassword } from '../../util/hash-password';
import { getNotesForUser } from '../note/note-service';
import { selectUserByUsername } from '../../repository/users-repository';

export const login = async ({ username, password }) => {
    const user = await selectUserByUsername(username);

    if (!user) {
        throw Error('fail-login');
    }
    if (!comparePassword(password, user.password)) {
        throw Error('fail-login');
    }
    return {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        roles: user.roles ? user.roles.map((r) => r.role) : [],
        isAdmin: user.roles.some((r) => r.role === 'admin'),
        notes: await getNotesForUser(user.id) || [],
    };
};
