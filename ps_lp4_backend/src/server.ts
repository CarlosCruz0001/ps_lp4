require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL do frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

let tarefas = [
  { id: 1, titulo: "Tarefa 1", status: "A Fazer" },
  { id: 2, titulo: "Tarefa 2", status: "Em Progresso" },
];

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);
  
  // Enviar tarefas ao novo cliente conectado
  socket.emit("tarefas", tarefas);

  // Adicionar nova tarefa
  socket.on("novaTarefa", (tarefa) => {
    tarefas.push(tarefa);
    io.emit("tarefas", tarefas);
  });

  // Mover tarefa entre colunas
  socket.on("moverTarefa", ({ id, status }) => {
    tarefas = tarefas.map((t) => (t.id === id ? { ...t, status } : t));
    io.emit("tarefas", tarefas);
  });

  // Editar tarefa existente
  socket.on("editarTarefa", ({ id, titulo }) => {
    tarefas = tarefas.map((t) => (t.id === id ? { ...t, titulo } : t));
    io.emit("tarefas", tarefas);
  });

  // Remover tarefa da lista
  socket.on("removerTarefa", ({ id }) => {
    tarefas = tarefas.filter((t) => t.id !== id);
    io.emit("tarefas", tarefas);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
