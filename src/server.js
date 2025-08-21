require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/invoices', require('./routes/invoices'));
app.use('/customers', require('./routes/customers'));
app.use('/settings', require('./routes/settings'));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
