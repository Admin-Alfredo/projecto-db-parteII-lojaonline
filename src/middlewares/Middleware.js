module.exports = () => {
  const Middlewares = {};

  Middlewares.parseDataForUse = (req, res, next) => {
    for (key in req.body) {
      let value = req.body[key]
      if (/^\d{1,}$/.test(value))
        req.body[key] = parseFloat(value);
    }
    next()
  }
  return Middlewares;
}