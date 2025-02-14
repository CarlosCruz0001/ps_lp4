import { useEffect, useState } from "react";
import { socket } from "../main";
import { Card, CardContent, Button, TextField, Typography } from "@mui/material";
import "./styles.css";

interface Tarefa {
  id: number;
  titulo: string;
  status: string;
}

const KanbanBoard = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [editando, setEditando] = useState<number | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [modoNoturno, setModoNoturno] = useState(false);

  useEffect(() => {
    socket.on("tarefas", (tarefasRecebidas: Tarefa[]) => {
      setTarefas(tarefasRecebidas);
    });

    return () => {
      socket.off("tarefas");
    };
  }, []);

  const adicionarTarefa = () => {
    if (!novaTarefa.trim()) return;
    const tarefa = { id: Date.now(), titulo: novaTarefa, status: "A Fazer" };
    socket.emit("novaTarefa", tarefa);
    setNovaTarefa("");
  };

  const moverTarefa = (id: number, novoStatus: string) => {
    socket.emit("moverTarefa", { id, status: novoStatus });
  };

  const iniciarEdicao = (tarefa: Tarefa) => {
    setEditando(tarefa.id);
    setTituloEditado(tarefa.titulo);
  };

  const salvarEdicao = (id: number) => {
    socket.emit("editarTarefa", { id, titulo: tituloEditado });
    setEditando(null);
  };

  const removerTarefa = (id: number) => {
    socket.emit("removerTarefa", { id });
  };

  return (
    <div className={`kanban-container ${modoNoturno ? "modo-noturno" : ""}`}>
      <Typography variant="h4" className="kanban-title">Kanban Colaborativo</Typography>
      <Button onClick={() => setModoNoturno(!modoNoturno)} variant="contained" className="modo-noturno-botao">
        {modoNoturno ? "Modo Claro" : "Modo Noturno"}
      </Button>
      <div className="kanban-input-container">
        <TextField
          label="Nova Tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          className="kanban-input"
        />
        <Button onClick={adicionarTarefa} variant="contained" className="kanban-add-button">Adicionar</Button>
      </div>

      <div className="kanban-grid">
        {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
          <div key={status} className={`kanban-column ${status.toLowerCase().replace(' ', '-')}`}>
            <Typography variant="h6" className="kanban-column-title">{status}</Typography>
            {tarefas.filter((t) => t.status === status).map((tarefa) => (
              <Card key={tarefa.id} className="kanban-card">
                <CardContent>
                  {editando === tarefa.id ? (
                    <>
                      <TextField
                        value={tituloEditado}
                        onChange={(e) => setTituloEditado(e.target.value)}
                        className="kanban-edit-input"
                      />
                      <Button onClick={() => salvarEdicao(tarefa.id)} variant="contained" className="kanban-save-button">Salvar</Button>
                    </>
                  ) : (
                    <>
                      <Typography>{tarefa.titulo}</Typography>
                      <Button onClick={() => iniciarEdicao(tarefa)} variant="text" className="kanban-edit-button">Editar</Button>
                      <Button onClick={() => removerTarefa(tarefa.id)} variant="text" className="kanban-delete-button">Remover</Button>
                      {status !== "Concluído" && (
                        <Button onClick={() => moverTarefa(tarefa.id, status === "A Fazer" ? "Em Progresso" : "Concluído")}
                                variant="outlined"
                                className="kanban-move-button">
                          Mover
                        </Button>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
