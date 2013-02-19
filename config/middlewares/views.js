// Locals
module.exports = function (config) {
  return function (req, res, next) {
    res.locals.appName = config.app.name;
    res.locals.title = '';
    res.locals.req = req;
    res.locals.isActive = function (link) {
      return req.url === link ? 'active' : '';
    }
    next();
  }
}