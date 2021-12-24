const {default: Note} = require( '../server/dist/models/note-model');
const {default: User} = require( '../server/dist/models/user-model');
const {default: Role} = require( '../server/dist/models/role-model');
const { hashPassword } = require('../server/dist/util/hash-password');
const {db} = require('../server/dist/repository/base-repository');

module.exports.default = class CreateUsers {
    async run(factory) {

        const [adminRole, userRole] = await db(Role, async ({repo}) => repo.find({order: {role: 'ASC'}}));

        await factory(User)()
            .map(async (user) => Object.assign(user, {
                ...user,
                username: 'johncford@gmail.com',
                password: hashPassword('Test@1234'),
                displayName: 'JC Ford',
                notes: await factory(Note)()
                    .map(async (note) => Object.assign(note, {
                        ...note,
                        author: user
                    }))
                    .makeMany(10 + Math.round(Math.random() * 15)),
                roles: [
                    adminRole,
                    userRole,
                ]
            }))
            .create();

        await factory(User)()
            .map(async (user) => Object.assign(user, {
                ...user,
                notes: await factory(Note)()
                    .map(async (note) => Object.assign(note, {
                        ...note,
                        author : user
                    }))
                    .makeMany(Math.round(Math.random() * 10)),
                roles: [userRole],
            }))
            .createMany(10 + Math.round(Math.random() * 15));
    }
};
