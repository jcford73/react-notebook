export const initialState = {
    users: []
};

export const mockState = {
    user: {
        id: 1,
        username: 'johncford@gmail.com',
        displayName: 'JC Ford',
        roles: ['user','admin'],
        isAdmin: true,
    },
    jwt: '',
    notes: [
        {
            "id": 1,
            "slug": "aut-enim-eos-quasi-voluptate",
            "title": "sint deserunt",
            "description": "Omnis suscipit laborum."
        },
        {
            "id": 2,
            "slug": "rerum-voluptatum-dolorem-ducimus-necessitatibus",
            "title": "placeat sed deserunt nulla voluptatem",
            "description": "Eius quo eum est quia laudantium."
        }
    ]
};
