const request = require('supertest');
const express = require('express');
const app = express();

const productRoutes = require('../Controllers/productController');

jest.mock('../Models/productModel', () => ({
  find: jest.fn(),
}));

app.use('/products', productRoutes);

describe('GET /products', () => {
  it('should retrieve a list of products', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];

    require('../Models/productModel').find.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });
});

describe('GET /products/:id', () => {
  it('should retrieve a product by ID', async () => {
    const productId = 1;
    const mockProduct = { id: productId, title: 'Product 1' };

    require('../Models/productModel').find.mockResolvedValue([mockProduct]);

    const response = await request(app).get(`/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });

  it('should handle invalid product ID', async () => {
    const invalidProductId = 'invalid';

    const response = await request(app).get(`/products/${invalidProductId}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Produit ID invalide' });
  });
});