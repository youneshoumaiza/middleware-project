const express = require('express');
const router = express.Router();
const Commande = require('../Models/commandeModel');

// Add a new Commande to the database
router.post('/', async (req, res) => {
  const commandeData = req.body;

  try {
    const nouvelleCommande = await Commande.create(commandeData);
    res.status(201).json(nouvelleCommande);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible d\'ajouter cette commande' });
  }
});

// Get a Commande by its ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const commande = await Commande.findById(id);
    
    if (!commande) {
      return res.status(404).json({ error: 'Cette commande n\'existe pas' });
    }
    
    res.json(commande);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the commande' });
  }
});

// Update an existing Commande
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const commande = await Commande.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!commande) {
      return res.status(404).json({ error: 'Cette commande n\'existe pas' });
    }
    
    res.json(commande);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the commande' });
  }
});

module.exports = router;