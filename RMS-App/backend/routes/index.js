const analyticsRoutes = require('./analytics');
const authRoutes = require('./auth');
const billRoutes = require('./bill');
const customerRoutes = require('./customer');
const dishRoutes = require('./dish');
const attendantRoutes = require('./attendant');
const chefRoutes = require('./chef');
const managerRoutes = require('./manager');
const employeeRoutes = require('./employee');
const ingredientsRoutes = require('./ingredients');
const stockRoutes = require('./stock');
const tblRoutes = require('./table');

const configureRoutes = function configureRoutes(app) {
  app.use('/analytics', analyticsRoutes);
  app.use('/auth', authRoutes);
  app.use('/bill', billRoutes);
  app.use('/customer', customerRoutes);
  app.use('/dish', dishRoutes);
  app.use('/employee/attendant', attendantRoutes);
  app.use('/employee/chef', chefRoutes);
  app.use('/employee/manager', managerRoutes);
  app.use('/employee', employeeRoutes);
  app.use('/ingredients', ingredientsRoutes);
  app.use('/stock', stockRoutes);
  app.use('/table', tblRoutes);
};

module.exports = configureRoutes;
