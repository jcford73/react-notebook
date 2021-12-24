import Note from '../../models/note-model';

const { EntitySchema } = require('typeorm');

const NoteEntity = new EntitySchema({
    name: 'Note',
    target: Note,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
            nullable: false,
        },
        slug: {
            type: 'varchar',
            nullable: false,
        },
        title: {
            type: 'varchar',
            nullable: false,
        },
        description: {
            type: 'varchar',
            nullable: true,
        },
        body: {
            type: 'varchar',
            nullable: true,
        },
    },
    relations: {
        author: {
            type: 'many-to-one',
            target: 'User',
            inverseSide: 'notes',
            nullable: false,
            joinColumn: { name: 'userId' },
        },
    },
});

export default NoteEntity;
