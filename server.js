// server.js (Backend com Node.js)
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('public'));

const TASKS_FILE = './tasks.json';

// Função para ler tarefas do arquivo JSON
const readTasks = () => {
  if (!fs.existsSync(TASKS_FILE)) {
    // Se o arquivo não existe, cria um array vazio
    return [];
  }
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    const tasks = JSON.parse(data);

    // Garante que o conteúdo seja um array
    if (Array.isArray(tasks)) {
      return tasks;
    } else {
      console.error('Erro: O conteúdo do arquivo tasks.json não é um array.');
      return [];
    }
  } catch (err) {
    console.error('Erro ao ler ou parsear tasks.json:', err);
    return [];
  }
};

// Função para salvar tarefas no arquivo JSON
const saveTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Rotas
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = req.body;
  newTask.id = Date.now(); // Gerar um ID único
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    saveTasks(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params; // ID da tarefa
  const { title, description } = req.body; // Novos dados
  const tasks = readTasks();

  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

   // Atualiza os dados da tarefa
   tasks[taskIndex].title = title || tasks[taskIndex].title;
   tasks[taskIndex].description = description || tasks[taskIndex].description;
 
   writeTasks(tasks);
   res.json({ message: 'Tarefa atualizada com sucesso!' });
 });

  // Deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  console.log('Recebendo ID para exclusão:', id);

  let tasks = readTasks();
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10));
  
  if (taskIndex === -1) {
    console.error('Tarefa não encontrada para exclusão.');
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  // Remove a tarefa da lista
  tasks = tasks.filter(task => task.id !== parseInt(id, 10));

  writeTasks(tasks);
  console.log('Tarefa excluída com sucesso!');
  res.json({ message: 'Tarefa excluída com sucesso!' });
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const id = parseInt(req.params.id);
  const filteredTasks = tasks.filter((task) => task.id !== id);
  saveTasks(filteredTasks);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
