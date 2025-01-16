const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name: String, required: true, 
  category: String, //(e.g., Appetizers, Main Course, Desserts).
  price: Number, required: true, 
  availability: Boolean, default: true
})

module.exports = mongoose('Menu', menuSchema);