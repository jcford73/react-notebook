module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'root',
    password: 'root',
    database: 'notebook',
    entities: ['./server/dist/repository/entities/*-entity.js'],
    seeds: ['./seeding/*.seeder.js'],
    factories: ['./seeding/*.factory.js'],
};
