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
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
      <div>
        <strong>${task.name}</strong>
        <p class="mb-0">${task.description || ''}</p>
      </div>
      <div>  
        <button class="btn btn-success btn-sm me-2" onclick="editTask(${task.id})">✏️ Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
      </div>  
      `;
      taskList.appendChild(li);
    });
  };

    // Função para editar tarefa
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

    // Função para excluir tarefa
  const deleteTask = async (id) => {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      await fetch(`/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    }
  };

    const renderTasks = (tasks) => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
    
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'card mb-3';
    
        taskItem.innerHTML = `
        <div class="card-body">
          <h3 class="card-title">${task.title}</h3>
          <p class="card-text">${task.description}</p>
          <div class="d-flex justify-content-between">  
            <button class="btn btn-primary btn-sm" onclick="editTask(${task.id})">✏️ Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
          </div>
        </div>  
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
