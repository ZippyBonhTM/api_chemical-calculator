import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.error(result.error);
}
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

routes(app); // Aplica as rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log(`Rota base: http://localhost:${PORT}/api/v1/`);
});

export default app;
