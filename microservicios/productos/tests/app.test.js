const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

afterAll(async () => {
    await pool.end();
});

describe('Pruebas de Productos', () => {
    test('GET /health debe responder correctamente', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.servicio).toBe('productos');
    });

    test('GET /productos debe devolver una lista', async () => {
        const response = await request(app).get('/productos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /productos/:id debe devolver 404 para producto inexistente', async () => {
        const response = await request(app).get('/productos/999');
        expect(response.statusCode).toBe(404);
    });
});
