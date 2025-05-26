"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElementController_1 = __importDefault(require("../controllers/ElementController"));
const express_1 = require("express");
const elementRoutes = (0, express_1.Router)();
elementRoutes.get("/api/v1/elements", ElementController_1.default.getAllElements);
elementRoutes.post("/api/v1/elements", ElementController_1.default.createElement);
elementRoutes.delete("/api/v1/elements/:id", ElementController_1.default.deleteElementById);
elementRoutes.put("/api/v1/elements/:id", ElementController_1.default.updateElementById);
exports.default = elementRoutes;
