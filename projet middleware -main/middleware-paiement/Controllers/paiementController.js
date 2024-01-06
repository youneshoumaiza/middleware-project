const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const amqp = require("amqplib");
require('dotenv').config();

const Paiement = require('../Models/paiementModel');

let channel;

async function connect() {
  const amqpServer = process.env.RABBITMQ_SERVER;
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("confirm_email");
}
connect();

router.post('/', async (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    // Logique de paiement
    const paiementData = req.body;
    try {
      const existingPaiement = await Paiement.findOne({ idCommande: paiementData.idCommande });
      if (existingPaiement) {
        return res.status(409).json({ error: 'Cette commande est déjà payée' });
      }

      const nouveauPaiement = await Paiement.create(paiementData);
      if (!nouveauPaiement) {
        return res.status(500).json({ error: 'Erreur, impossible d\'établir le paiement, réessayez plus tard' });
      }

      const commandeResponse = await axios.get(`${process.env.SERVICE_COMMANDES}/${nouveauPaiement.idCommande}`);
      const commandeData = commandeResponse.data;
      if (!commandeData) {
        return res.status(404).json({ error: 'La commande correspondante n\'a pas été trouvée' });
      }

      // Update the Commande to mark it as paid
      commandeData.commandePayee = true;
      const updateCommandeResponse = await axios.put(`${process.env.SERVICE_COMMANDES}/${nouveauPaiement.idCommande}`, commandeData);
      if (updateCommandeResponse.status !== 200) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
      }

      const email = "youneshm44@gmail.com";
      channel.sendToQueue(
        "confirm_email",
        Buffer.from(
          JSON.stringify({
            email,
          })
        )
      );

      return res.status(201).json(nouveauPaiement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Une erreur est survenue lors du paiement' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;