module.exports = (app) => {
  const settings = app.locals.settings;
  const Router = settings.Router();

  Router.get('/', function (req, res, next) {
    res.send('HomePage');
  });

  return Router
};
  
