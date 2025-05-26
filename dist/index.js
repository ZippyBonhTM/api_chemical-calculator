"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const elementRoutes_1 = __importDefault(require("./routes/elementRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    console.error();
}
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", elementRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
    console.log(`Rota base: http://localhost:${PORT}/api/v1/`);
});
