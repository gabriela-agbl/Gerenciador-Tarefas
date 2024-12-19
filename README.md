# 📑 Gerenciador de Tarefas Online

Este é um servidor criado para auxiliar na criação de tarefas. O objetivo deste sistema é permitir que os usuários adicionem, visualizem, editem e removam tarefas de uma lista, ajudando no controle e organização de suas atividades diárias.

## 📋 Tecnologias utilizadas

- **JavaScript**: Para interatividade e manipulação de dados.
- **HTML**: Para estruturação da página web.
- **CSS**: Para estilização da interface do usuário.
- **Node.js**: Para configurar o servidor backend.
- **JSON**: Para persistência das tarefas.

## 🛠️ Funcionalidades

- ✅ Adicionar tarefas com título e descrição. ✅
- 📋 Listar todas as tarefas salvas. ✅ 
- ✏️ Editar tarefas existentes. ✅
- 🗑️ Excluir tarefas desnecessárias. ✅
- 💾 Persistência de dados usando um arquivo JSON. ✅

## 📂 **Estrutura do Projeto**

   ```bash
      Gerenciador de Tarefas/
│
├── public/               # Arquivos Frontend
│   ├── index.html        # Página principal
│   ├── style.css         # Estilização do projeto
│   └── script.js         # Lógica de interação
│
├── Server/               # Servidor e dados
│   ├── server.js         # Servidor Node.js
│   └── tasks.json        # Armazena as tarefas
│
├── package.json          # Dependências do projeto
└── README.md             # Documentação do projeto
   ```

## 🚀 Como executar o servidor

1. Clone este repositório:
    ```bash
    git clone https://github.com/Agbl09/Gerenciador-Tarefas.git
    cd Gerenciador-Tarefas
    ```
2. Instale as dependências:
    ```bash
    npm install

    npm init -y

    npm install express
    ```
3. Inicie o servidor:
    ```bash
    node server.js
    ```
4. Acesse no navegador:

   Abra o navegador e acesse:
    ```arduino
    http://localhost:3000
    ```
## 🧩 Dependências   

- **Express.js** - Framework para servidor web.
- **Node.js** - Ambiente de execução do JavaScript.

## 🤝 Contribuição

Contribuições são sempre bem-vindas!

1. Faça um **fork** do projeto.

2. Crie uma nova **branch**: `git checkout -b minha-feature`.

3. Commit suas alterações: `git commit -m 'Adiciona minha nova feature'`.

4. Faça um **push**: `git push origin minha-feature`.

5. Abra um **Pull Request**.

## 📊 Status do projeto

Atualmente em desenvolvimento 🟡. Mais recursos serão adicionados em breve!

## 📝 Licença
   Este projeto foi desenvolvido para fins educacionais e está disponível para uso e modificação conforme necessário.

   Feito por [Gabriela Rodrigues](https://github.com/Agbl09)
