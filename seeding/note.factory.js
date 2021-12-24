const { define } = require('typeorm-seeding');
const {default: Note} = require( '../server/dist/models/note-model');

define(Note, (faker) => {
    const slug = faker.lorem.slug(5);
    const title = faker.lorem.words(1 + Math.ceil(Math.random() * 4));
    const description = faker.lorem.sentence(2 + Math.ceil(Math.random() * 13), 30);
    const body = '<p>'.concat(faker.lorem.paragraphs(Math.ceil(Math.random() * 10)).split(/[ \r]*\n[ \r]*/).join('</p><p>').concat('</p>')).replace('<p></p>','<br />');
    // const body = faker.lorem.paragraphs(Math.ceil(Math.random() * 10));

    const note = new Note({
        slug,
        title,
        description,
        body
    });

    return note;
});
