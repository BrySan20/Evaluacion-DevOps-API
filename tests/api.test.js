const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
    
    // Prueba 1: Verificar el Health Check
    it('GET /api/status debería retornar 200 OK', async () => {
        const res = await request(app).get('/api/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });

    // Prueba 2: Obtener lista de tareas
    it('GET /api/tasks debería retornar una lista', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Prueba 3: Crear una nueva tarea
    it('POST /api/tasks debería crear una tarea', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ title: "Nueva tarea de prueba" });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Nueva tarea de prueba');
    });
});