const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});


const commandeRouter = require('../Controllers/commandeController');
const Commande = require('../Models/commandeModel');

app.use(express.json());
app.use('/commandes', commandeRouter);

describe('Commande API', () => {
    it('should create a new Commande', async () => {
        const newCommandeData = {
            productId: 1,
            dateCommande: new Date(),
            quantite: 5,
            commandePayee: false,
        };

        const response = await request(app)
            .post('/commandes')
            .send(newCommandeData);

        expect(response.status).toBe(201);
        expect(response.body.productId).toBe(newCommandeData.productId);

        // You can also check the database to see if the new Commande was created
        const createdCommande = await Commande.findOne({ productId: newCommandeData.productId });
        expect(createdCommande).not.toBeNull();
    });

    // let newCommandeId = 1;
    // 
    // it('should get a Commande by its ID', async () => {
    //     const response = await request(app).get(`/${newCommandeId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body.productId).toBe(1);
    // });

    // it('should update an existing Commande', async () => {
    //     const updatedData = {
    //         quantite: 10,
    //         commandePayee: true,
    //     };

    //     const response = await request(app)
    //         .put(`/${newCommandeId}`)
    //         .send(updatedData);

    //     expect(response.status).toBe(200);
    //     expect(response.body.quantite).toBe(updatedData.quantite);
    //     expect(response.body.commandePayee).toBe(updatedData.commandePayee);
    // });

    it('should return a 404 error when getting a non-existent Commande', async () => {
        const nonExistentId = 'nonexistent123';
        const response = await request(app).get(`/${nonExistentId}`);

        expect(response.status).toBe(404);
    });

    it('should return a 404 error when updating a non-existent Commande', async () => {
        const nonExistentId = 'nonexistent456';
        const updatedData = {
            quantite: 10,
            commandePayee: true,
        };

        const response = await request(app)
            .put(`/${nonExistentId}`)
            .send(updatedData);

        expect(response.status).toBe(404);
    });
});
