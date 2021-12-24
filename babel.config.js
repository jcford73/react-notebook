module.exports = (api) => {
    api.cache(api.env('development'));
    return {
        babelrcRoots: ['client, server'],
    };
};
