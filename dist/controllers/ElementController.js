"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class ElementController {
    /**
    * Cria um novo elemento como base nos dados fornecidos.
    * @param req - Requisição contendo os dados do elemento (name, symbol...).
    * @param res - Resposta para enviar o resultado da criação.
    * @returns Resposta com status 201 e os dados do elemento criado.
    * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
    * @example
    * ```typescript
    * const req = { body: { name: "Test", symbol: "Te", ... }};
    * await ElementController.create(req, res);
    * ```
    */
    static createElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const protoElement = req.body;
                yield database_1.db.elements.create(protoElement);
                res.status(201).json({ message: "Elemento criado com sucesso!" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
    * Ver todos os elementos.
    * @param _ - (req) Requisição.
    * @param res - Resposta para enviar o resultado da criação.
    * @returns Resposta com status 200 e os dados.
    * @throws Lança erro se houver falha no banco de dados.
    * @example
    * ```typescript
    * await ElementController.getAllElements();
    * ```
    */
    static getAllElements(_, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allElements = yield database_1.db.elements.find();
                res.status(200).json(allElements);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ElementController;
;
