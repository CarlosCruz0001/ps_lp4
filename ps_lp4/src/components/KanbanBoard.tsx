import { useEffect, useState } from "react";
import { socket } from "../main";
import { Container, Grid, Card, CardContent, Button, TextField } from "@mui/material";

interface Tarefa {
  id: number;
  titulo: string;
  status: string;
}

const KanbanBoard = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    socket.on("tarefas", (tarefasRecebidas: Tarefa[]) => {
      setTarefas(tarefasRecebidas);
    });

    return () => {
      socket.off("tarefas");
    };
  }, []);

  const adicionarTarefa = () => {
    const tarefa = { id: Date.now(), titulo: novaTarefa, status: "A Fazer" };
    socket.emit("novaTarefa", tarefa);
    setNovaTarefa("");
  };

  const moverTarefa = (id: number, novoStatus: string) => {
    socket.emit("moverTarefa", { id, status: novoStatus });
  };

  return (
    <Container>
      <h1>Kanban Colaborativo</h1>
      <TextField
        label="Nova Tarefa"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <Button onClick={adicionarTarefa}>Adicionar</Button>
      
      <Grid container spacing={2}>
        {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
          <Grid item xs={4} key={status}>
            <h2>{status}</h2>
            {tarefas.filter((t) => t.status === status).map((tarefa) => (
              <Card key={tarefa.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <p>{tarefa.titulo}</p>
                  {status !== "Concluído" && (
                    <Button onClick={() => moverTarefa(tarefa.id, status === "A Fazer" ? "Em Progresso" : "Concluído")}>
                      Mover
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
