const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/routes.auth.js');
const menuRoutes = require('./routes/routes.menu.js');
const orderRoutes = require('./routes/routes.order.js')

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config({ path: './.env' });

app.use(bodyParser.json());

app.use('/auth', authRoutes); 
app.use('/menu', menuRoutes); 
app.use('/order', orderRoutes); 

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});