"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElementController_1 = __importDefault(require("controllers/ElementController"));
const express_1 = require("express");
const elementRoutes = (0, express_1.Router)();
elementRoutes.use("/api/v1/elements", ElementController_1.default.getAllElements);
exports.default = elementRoutes;
