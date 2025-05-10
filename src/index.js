const express = require('express');
const routes = require('./routes/routes');
const checkAndCreateAdmin = require('./config/checkAndCreateAdmin');

require('dotenv').config();

const app = express();
app.use(express.json());
checkAndCreateAdmin();
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
