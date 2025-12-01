const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos en memoria inicial
let tasks = [
    { id: 1, title: "Configurar VPS", date: "2025-11-20", completed: true },
    { id: 2, title: "Desplegar Blue-Green", date: "2025-11-30", completed: false }
];

// --- RUTAS ---

// 1. Health Check
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'ok', 
        version: 'V3 (BLUE)', // Cambiar esto manualmente en cada deploy para comprobar versión actual
        uptime: process.uptime() 
    });
});

// 2. GET: Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 3. POST: Crear una tarea
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(), // ID único basado en tiempo
        title: req.body.title,
        date: req.body.date || new Date().toISOString().split('T')[0],
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. PUT: Editar/Completar tarea
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex > -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// 5. DELETE: Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});

module.exports = app;