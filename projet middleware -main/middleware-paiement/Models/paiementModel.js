const mongoose = require('mongoose');
const { Schema } = mongoose;

const paiementSchema = new Schema({
  idCommande: String,
  montant: Number,
  numeroCarte: Number,
});

const Paiement = mongoose.model('Paiement', paiementSchema);

module.exports = Paiement;