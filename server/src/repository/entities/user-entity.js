import User from '../../models/user-model';

const { EntitySchema } = require('typeorm');

const UserEntity = new EntitySchema({
    name: 'User',
    target: User,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        username: {
            type: 'varchar',
            unique: true,
            nullable: false,
        },
        password: {
            type: 'varchar',
            nullable: false,
        },
        displayName: {
            type: 'varchar',
            nullable: false,
        },
    },
    relations: {
        notes: {
            type: 'one-to-many',
            target: 'Note',
            cascade: true,
        },
        roles: {
            type: 'many-to-many',
            target: 'Role',
            cascade: true,
            joinTable: true,
            eager: true,
        },
    },
});

export default UserEntity;
