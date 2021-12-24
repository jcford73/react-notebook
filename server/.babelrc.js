module.exports = function (api) {
    api.cache(api.env('development'));

    return {
        presets: [
            ['@babel/preset-env', {
                targets: {
                    node: 'current',
                },
            }],
        ],
        plugins: [],
    };
};
