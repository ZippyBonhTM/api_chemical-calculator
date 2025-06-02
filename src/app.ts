import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.error(result.error);
}
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
routes(app); // Aplica as rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log(`Rota base: http://localhost:${PORT}/api/v1/`);
});

export default app;
