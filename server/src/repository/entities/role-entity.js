import Role from '../../models/role-model';

const { EntitySchema } = require('typeorm');

const RoleEntity = new EntitySchema({
    name: 'Role',
    target: Role,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        role: {
            type: 'varchar',
            unique: true,
            nullable: false,
        },
        description: {
            type: 'varchar',
            unique: false,
            nullable: false,
        },
    },
});

export default RoleEntity;
