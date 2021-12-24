const { define } = require('typeorm-seeding');
const {default: User} = require( '../server/dist/models/user-model');
const { hashPassword } = require('../server/dist/util/hash-password');

define(User, (faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const username = faker.internet.email(
        faker.name.firstName(gender),
        faker.name.lastName(gender),
    );
    const password = hashPassword('Test@1234');

    const user = new User({
        username,
        password,
        displayName: firstName,
    });
    user.username = username;

    return user;
});
