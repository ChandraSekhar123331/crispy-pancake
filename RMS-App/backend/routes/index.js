const authRoutes = require('./auth');
const tblRoutes = require('./table');

const configureRoutes = function configureRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/table', tblRoutes);
};

module.exports = configureRoutes;
