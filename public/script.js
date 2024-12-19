document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Função para buscar e renderizar as tarefas
  const fetchTasks = async () => {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${task.name}</strong>
        <p>${task.description || ''}</p>
        <button onclick="editTask(${task.id})">✏️ Editar</button>
        <button onclick="deleteTask(${task.id})">🗑️ Excluir</button>
      `;
      taskList.appendChild(li);
    });
  };

    const editTask = async (id) => {
      const title = prompt("Digite o novo título da tarefa:");
      const description = prompt("Digite a nova descrição da tarefa:");
    
      if (title && description) {
        await fetch(`/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: title, description }),
        });
        fetchTasks(); // Atualiza a lista de tarefas
      }
    };

    const renderTasks = (tasks) => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
    
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
    
        taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <button onclick="editTask(${task.id})">✏️ Editar</button>
          <button onclick="deleteTask(${task.id})">🗑️ Excluir</button>
        `;
    
        taskList.appendChild(taskItem);
      });
    };
  
    // Evento para adicionar uma nova tarefa
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTask = { name: taskInput.value, description: document.getElementById('taskDescription').value }; // Adiciona descrição vazia por padrão
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    taskInput.value = '';
    document.getElementById('taskDescription').value = ''; // Limpa o campo de descrição
    fetchTasks();
  });

  // Carrega as tarefas ao iniciar
  fetchTasks();

  // Tornar editTask e deleteTask acessíveis globalmente
  window.editTask = editTask;
  window.deleteTask = deleteTask;
});
