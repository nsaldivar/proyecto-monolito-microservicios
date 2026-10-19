const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

afterAll(async () => {
    await pool.end();
});

describe('Pruebas de Usuarios', () => {
    test('GET /health debe responder correctamente', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.servicio).toBe('usuarios');
    });

    test('GET /usuarios debe devolver una lista', async () => {
        const response = await request(app).get('/usuarios');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /usuarios/:id debe devolver 404 para usuario inexistente', async () => {
        const response = await request(app).get('/usuarios/999');
        expect(response.statusCode).toBe(404);
    });
});
