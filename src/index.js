const express = require('express');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const checkAndCreateAdmin = require('./config/checkAndCreateAdmin');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
checkAndCreateAdmin();

app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
