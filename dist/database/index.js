"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = require("mongoose");
const Element_1 = __importDefault(require("./schemas/Element"));
exports.db = {
    // users: model("user", UserSchema, "users"),
    elements: (0, mongoose_1.model)("element", Element_1.default, "elements")
};
