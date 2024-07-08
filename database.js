const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: process.env.PORT // default port for PostgreSQL
});

const Organisation = require('./models/org.model')(sequelize, Sequelize.DataTypes);
const User = require('./models/user.model')(sequelize,Sequelize.DataTypes);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {
    sequelize,
    models: {
      Organisation: Organisation,
      User: User
    }
  };
