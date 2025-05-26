"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class ElementController {
    static async createElement(req, res, next) {
        try {
            const protoElement = req.body;
            await database_1.db.elements.create(protoElement);
            res.status(201).json({ message: "Elemento criado com sucesso!" });
        }
        catch (err) {
            next(err);
        }
    }
    static async getAllElements(_, res, next) {
        try {
            const allElements = await database_1.db.elements.find();
            res.status(200).json(allElements);
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteElementById(req, res, next) {
        try {
            const elementId = req.params.id;
            if (!elementId)
                res.status(400).json({ message: 'Valor "id" não foi encontrado! Passe pelos parâmetros da URL!' });
            await database_1.db.elements.deleteOne({ _id: elementId });
            res.status(200).json({ message: "Elemento removido com sucesso!" });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateElementById(req, res, next) {
        try {
            const ElementId = req.params.id;
            const ElementData = req.body;
            if (!ElementId || !ElementData) {
                res.status(400).json({
                    message: "Um ou mais dados estão ausentes! Certifique-se de passar o id pelo parâmetro da url e os dados a serem atualizados!"
                });
            }
            const updatedElement = await database_1.db.elements.findByIdAndUpdate(ElementId, ElementData);
            res.status(200).json({ message: "Elemento editado com sucesso!", updatedElement });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = ElementController;
;
