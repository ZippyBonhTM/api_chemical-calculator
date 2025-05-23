import express from "express";
import elementRoutes from "./routes/elementRoutes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Aplicando as rotas
app.use("/", elementRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log(`Rota base: http://localhost:${PORT}`);
});
