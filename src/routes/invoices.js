const express = require('express');
const router = express.Router();
const { Invoice, Customer } = require('../models');
const { authMiddleware } = require('./middleware');

// Get invoices (paginated)
router.get('/', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const invoices = await Invoice.findAndCountAll({
    where: { UserId: req.user.id },
    limit: parseInt(limit),
    offset: parseInt(offset),
    include: Customer,
    order: [['createdAt', 'DESC']],
  });
  res.json(invoices);
});

// Create invoice
router.post('/', authMiddleware, async (req, res) => {
  const invoice = await Invoice.create({ ...req.body, UserId: req.user.id });
  res.json(invoice);
});

// Update invoice
router.put('/:id', authMiddleware, async (req, res) => {
  const invoice = await Invoice.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  await invoice.update(req.body);
  res.json(invoice);
});

// Delete invoice
router.delete('/:id', authMiddleware, async (req, res) => {
  const invoice = await Invoice.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  await invoice.destroy();
  res.json({ success: true });
});

module.exports = router;
