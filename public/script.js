document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    const fetchTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        taskList.appendChild(li);
      });
    };
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newTask = { name: taskInput.value };
      await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      taskInput.value = '';
      fetchTasks();
    });
  
    fetchTasks();
  });
  