const express = require('express');
const app = express();
const authRoute = require('./routes/auth.route');
const organisationRoute = require('./routes/org.route');
const {sequelize, models} = require('./database').sequelize;

app.use(express.json());

app.use('/auth', authRoute);
app.use('/api', organisationRoute);

const port = process.env.PORT
app.listen(port, () => {
  console.log('Server listening on port' + port);
});


