"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const elementRoutes_1 = __importDefault(require("routes/elementRoutes"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", (res) => {
    res.status(200).json({ message: "Seja bem vindo à API de Element da Calculadora Química!" });
});
// Aplicando as rotas
app.use('/api/v1/elements', elementRoutes_1.default);
app.listen(PORT, (err) => {
    if (err)
        throw new Error(`ERRO: ${err}`);
    console.log(`Servidor rodando na porta ${PORT}.`);
    console.log(`Rota base: http://localhost:${PORT}/`);
});
