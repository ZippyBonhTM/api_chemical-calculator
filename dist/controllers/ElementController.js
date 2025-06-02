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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const elementParamsProcessor_1 = __importDefault(require("./utils/elementParamsProcessor"));
class ElementController {
    static createElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const protoElement = req.body;
                const newElement = yield database_1.default.elements.create(protoElement);
                res.status(201).send(newElement.toJSON());
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getAllElements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query) {
                    const filter = (0, elementParamsProcessor_1.default)(req.query);
                    if (filter.errors.length === 0) {
                        if (filter) {
                            const elements = yield database_1.default.elements.find(filter.query).lean().exec();
                            res.status(200).send(elements);
                        }
                        else {
                            res.status(200).send([]);
                        }
                    }
                    else {
                        res.status(400).json({ message: "Sua query params está inválida!", erros: filter.errors });
                    }
                }
                else {
                    const allElements = database_1.default.elements.find().lean().exec();
                    res.status(200).json(allElements);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getElementById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const elementId = req.params.id;
                const element = yield database_1.default.elements.findById(elementId);
                if (!element) {
                    res.status(400).json({ message: "Nenhum elemento foi encontrado!" });
                }
                else {
                    res.status(200).send(element.toJSON());
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateElementById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ElementId = req.params.id;
                const ElementData = req.body;
                if (!ElementId || !ElementData) {
                    res.status(400).json({
                        message: "Um ou mais dados estão ausentes! Certifique-se de passar o id pelo parâmetro da url e os dados a serem atualizados!"
                    });
                }
                const updatedElement = yield database_1.default.elements.findByIdAndUpdate(ElementId, ElementData).lean().exec();
                res.status(200).json({ message: "Elemento editado com sucesso!", updatedElement });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteElementById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const elementId = req.params.id;
                const result = yield database_1.default.elements.deleteOne({ _id: elementId });
                if (result.deletedCount === 0)
                    res.status(304).json({ message: "Nenhum elemento foi encontrado para ser deletado!" });
                res.status(200).json({ message: "Elemento removido com sucesso!" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ElementController;
;
