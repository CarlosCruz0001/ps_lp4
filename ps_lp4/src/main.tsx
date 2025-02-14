import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { io } from "socket.io-client";
import KanbanBoard from "./components/KanbanBoard";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KanbanBoard />
  </StrictMode>,
)
export const socket = io("http://localhost:3000");