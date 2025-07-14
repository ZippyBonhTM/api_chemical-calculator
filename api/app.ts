import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.error(result.error);
}
import cors from "cors";
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3010;

const app = express();
app.use(cors())

routes(app); // Aplica as rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log(`Rota base: http://localhost:${PORT}/api/v1/`);
});

export default app;
