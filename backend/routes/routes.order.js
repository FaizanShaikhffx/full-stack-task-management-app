const express = require('express');
const Order = require('../models/model.order.js');
const Menu = require('../models/model.menu.js');
const authMiddleware = require('../middleware/middleware.auth.js');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItemId);
      if (!menuItem) return res.status(404).send('Menu item not found');
      totalAmount += menuItem.price * item.quantity;
    }

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
