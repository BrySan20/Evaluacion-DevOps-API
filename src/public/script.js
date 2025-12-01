const API_URL = '/api/tasks';

// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const serverStatus = document.getElementById('server-status');

// 1. Cargar Estado del Servidor
fetch('/api/status')
    .then(res => res.json())
    .then(data => {
        serverStatus.innerHTML = `Estado: ${data.status.toUpperCase()} | Versión: ${data.version || 'Desconocida'}`;
    });

// 2. Cargar Tareas
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
}

// 3. Renderizar Tareas
function renderTasks(tasks) {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <small style="display:block; color:#888">${task.date || 'Sin fecha'}</small>
            </div>
            <div class="actions">
                <button onclick="toggleTask(${task.id}, ${!task.completed})" class="btn-check">
                    ${task.completed ? '↩' : '✔'}
                </button>
                <button onclick="deleteTask(${task.id})" class="btn-delete">✖</button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

// 4. Agregar Tarea
async function addTask() {
    if (!taskInput.value) return alert("Escribe una tarea");
    
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title: taskInput.value,
            date: dateInput.value 
        })
    });
    
    taskInput.value = '';
    loadTasks();
}

// 5. Completar/Descompletar Tarea
async function toggleTask(id, status) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: status })
    });
    loadTasks();
}

// 6. Eliminar Tarea
async function deleteTask(id) {
    if(!confirm("¿Borrar tarea?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();
}

// Inicializar
loadTasks();