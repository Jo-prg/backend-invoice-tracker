const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authMiddleware } = require('./middleware');
const bcrypt = require('bcrypt');

// Change username
router.put('/username', authMiddleware, async (req, res) => {
  await req.user.update({ username: req.body.username });
  res.json({ success: true });
});

// Change password
router.put('/password', authMiddleware, async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await req.user.update({ password: hash });
  res.json({ success: true });
});

// Change profile pic
router.put('/profile-pic', authMiddleware, async (req, res) => {
  await req.user.update({ profilePic: req.body.profilePic });
  res.json({ success: true });
});

module.exports = router;
