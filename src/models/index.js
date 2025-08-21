const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  profilePic: DataTypes.STRING,
});

const Customer = sequelize.define('Customer', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
});

const Invoice = sequelize.define('Invoice', {
  amount: DataTypes.FLOAT,
  data: DataTypes.JSONB,
});

User.hasMany(Customer);
Customer.belongsTo(User);
User.hasMany(Invoice);
Invoice.belongsTo(User);
Customer.hasMany(Invoice);
Invoice.belongsTo(Customer);

module.exports = { sequelize, User, Customer, Invoice };
