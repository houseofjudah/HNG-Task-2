const express = require('express');
const app = express();
const authRoute = require('./routes/auth.route');
const organisationRoute = require('./routes/org.route');
const {sequelize, models} = require('./database');

app.use(express.json());

app.use('/auth', authRoute);
app.use('/api', organisationRoute);




const { Organisation, User } = models;


Organisation.findAll().then(organisations => {
  console.log(organisations);
});

User.findAll().then(user => {
  console.log(user);
});


const port = process.env.PORT
app.listen(port, () => {
  console.log('Server listening on port' + port);
});


