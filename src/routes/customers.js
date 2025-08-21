const express = require('express');
const router = express.Router();
const { Customer, Invoice } = require('../models');
const { authMiddleware } = require('./middleware');

// Get customers with total invoiced
router.get('/', authMiddleware, async (req, res) => {
  const customers = await Customer.findAll({
    where: { UserId: req.user.id },
    include: [{ model: Invoice }],
  });
  const result = customers.map(c => ({
    ...c.toJSON(),
    totalInvoiced: c.Invoices.reduce((sum, i) => sum + i.amount, 0),
  }));
  res.json(result);
});

// Create customer
router.post('/', authMiddleware, async (req, res) => {
  const customer = await Customer.create({ ...req.body, UserId: req.user.id });
  res.json(customer);
});

// Update customer
router.put('/:id', authMiddleware, async (req, res) => {
  const customer = await Customer.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!customer) return res.status(404).json({ error: 'Not found' });
  await customer.update(req.body);
  res.json(customer);
});

// Delete customer
router.delete('/:id', authMiddleware, async (req, res) => {
  const customer = await Customer.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!customer) return res.status(404).json({ error: 'Not found' });
  await customer.destroy();
  res.json({ success: true });
});

module.exports = router;
