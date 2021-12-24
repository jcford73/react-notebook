import { createConnection, getConnection } from 'typeorm';

import { PG_INVALID_CATALOG_NAME } from './db-errors';
import environment from '../environment/environment';
import NoteEntity from './entities/note-entity';
import UserEntity from './entities/user-entity';
import RoleEntity from './entities/role-entity';

const createDb = async () => {
    console.log(`Creating database ${environment.db.database}`);
    const connection = await createConnection({
        type: 'postgres',
        host: environment.db.host,
        port: environment.db.port,
        username: environment.db.user,
        password: environment.db.password,
        logging: ['query'],
    });
    await connection.query(`CREATE DATABASE ${environment.db.database}`);
    await connection.close();
    console.log('Database created.');
};

export const connectDb = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: environment.db.host,
            port: environment.db.port,
            username: environment.db.user,
            password: environment.db.password,
            database: environment.db.database,
            synchronize: environment.db.synchronize,
            entities: [
                UserEntity,
                NoteEntity,
                RoleEntity,
            ],
        });
    } catch (error) {
        if (error.code === PG_INVALID_CATALOG_NAME) {
            await createDb();
            await connectDb();
            return;
        }
        throw error;
    }
};

export const db = async (entityType, cb) => {
    const connection = await getConnection();
    return cb({
        connection,
        manager: connection.manager,
        repo: connection.getRepository(entityType),
        query: connection.createQueryRunner(),
        queryBuilder: connection.createQueryBuilder(),
    });
};
