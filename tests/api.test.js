const request = require('supertest');
const app = require('../src/app');

describe('API To-Do Completa', () => {
    
    let createdTaskId;

    // Prueba 1: Health Check
    it('GET /api/status - Debe estar OK', async () => {
        const res = await request(app).get('/api/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });

    // Prueba 2: Obtener todas las tareas
    it('GET /api/tasks - Debe traer lista inicial', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Prueba 3: Crear, Editar y Eliminar tarea
    it('POST /api/tasks - Debe crear tarea', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ title: "Test Task", date: "2025-12-01" });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toBe("Test Task");
        createdTaskId = res.body.id; // Guardamos ID para tests siguientes
    });

    // Prueba 4: Editar/Completar tarea
    it('PUT /api/tasks/:id - Debe marcar como completada', async () => {
        const res = await request(app)
            .put(`/api/tasks/${createdTaskId}`)
            .send({ completed: true });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.completed).toBe(true);
    });

    // Prueba 5: Eliminar tarea
    it('DELETE /api/tasks/:id - Debe eliminar tarea', async () => {
        const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
        expect(res.statusCode).toEqual(204);
    });
});
