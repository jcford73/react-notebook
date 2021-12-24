module.exports = function (api) {
  api.cache(api.env('development'));

  const presets = [
    ['@babel/preset-react', { runtime: 'automatic' }]
  ];

  return {
    presets,
  };
};
