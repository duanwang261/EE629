const schoolsRoutes = require('./schools');


const constructorMethod = (app) => {
  app.use('/', schoolsRoutes);


  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;