const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// --- CONFIGURAR ARCHIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos en memoria
let tasks = [
    { id: 1, title: "Configurar VPS", completed: true },
    { id: 2, title: "Desplegar Blue-Green", completed: false }
];

// --- RUTAS ---

// 1. Health Check (Vital para Blue-Green)
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'ok', 
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime() 
    });
});

// 2. Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 3. Crear una tarea
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

module.exports = app;