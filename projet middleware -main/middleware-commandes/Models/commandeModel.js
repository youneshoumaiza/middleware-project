const mongoose = require('mongoose');
const { Schema } = mongoose;

const commandeSchema = new Schema({
  productId: Number,
  dateCommande: Date,
  quantite: Number,
  commandePayee: Boolean,
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;