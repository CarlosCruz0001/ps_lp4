# Kanban Colaborativo

Este projeto consiste em um Kanban colaborativo utilizando **Node.js**, **Express**, **Socket.io** no backend e **React** com **Material UI** no frontend.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Socket.io, dotenv, cors
- **Frontend**: React, Material UI, Socket.io-client

## 📂 Estrutura do Projeto

O projeto é dividido em duas pastas:
- **backend/**: Contém a API e o servidor WebSocket
- **frontend/**: Contém a interface do usuário construída em React

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🛠 Instalação

### Clonar o repositório
```sh
    git clone https://github.com/CarlosCruz0001/ps_lp4.git
    cd ps_lp4
```

### Instalar as dependências

#### Backend
```sh
    cd ../ps_lp4_backend
    npm install
```

#### Frontend
```sh
    cd ../ps_lp4
    npm install
```

## ▶️ Como Executar

### Backend
Dentro da pasta **backend**, execute:
```sh
    node src/server.ts
```
Isso iniciará o servidor na porta `3000`.

### Frontend
Dentro da pasta **frontend**, execute:
```sh
    npm run dev
```
Isso iniciará o frontend na porta `5173`.

## ⚙️ Configuração

Caso queira alterar a URL do frontend, edite a origem do CORS em `src/server.ts`:
```js
origin: "http://localhost:5173" // Alterar se necessário
```

## 🎯 Funcionalidades

- Criar novas tarefas
- Editar títulos das tarefas
- Mover tarefas entre colunas
- Remover tarefas
- Sincronização em tempo real entre usuários via WebSocket

## 🛠 Tecnologias Utilizadas

- **Express** para criação do servidor backend
- **Socket.io** para comunicação em tempo real
- **React** para construção da interface
- **Material UI** para estilização

## 📜 Licença
Este projeto está sob a licença MIT.

