module.exports = (req, res, next) => {
  req.queryShadow = JSON.parse(JSON.stringify(req.query));
  next();
};