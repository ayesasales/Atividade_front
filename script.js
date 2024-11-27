let tasks = [];
let filterStatus = 'all';

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

document.getElementById('filter-btn').addEventListener('click', function() {
    toggleFilter();
    renderTasks();
});

function addTask() {
    const name = document.getElementById('task-name').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    const task = {
        name: name,
        deadline: deadline,
        completed: false,
        priority: priority
    };

    tasks.push(task);
    document.getElementById('task-form').reset();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'completed') return task.completed;
        if (filterStatus === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.sort((a, b) => {
        if (a.priority === b.priority) {
            return new Date(a.deadline) - new Date(b.deadline);
        }
        return a.priority.localeCompare(b.priority);
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        if (new Date(task.deadline) <= new Date() && !task.completed) {
            li.classList.add('urgent');
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            ${task.name} - ${task.deadline} - Prioridade: ${task.priority}
            <button onclick="editTask(${index})">Editar</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function toggleFilter() {
    if (filterStatus === 'all') {
        filterStatus = 'completed';
        document.getElementById('filter-btn').innerText = 'Mostrar Pendentes';
    } else if (filterStatus === 'completed') {
        filterStatus = 'pending';
        document.getElementById('filter-btn').innerText = 'Mostrar Todas';
    } else {
        filterStatus = 'all';
        document.getElementById('filter-btn').innerText = 'Filtrar Concluídas';
    }
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-deadline').value = task.deadline;
    document.getElementById('task-priority').value = task.priority;

    tasks.splice(index, 1); // Remove a tarefa para edição
    renderTasks();
}
