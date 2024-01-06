const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);