const {default: Role} = require( '../server/dist/models/role-model');

module.exports.default = function() {
    this.run = async (factory, connection) => {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                { role: 'user', description: 'User'},
                { role: 'admin', description: 'Admin'}
            ])
            .execute();
    };
};
