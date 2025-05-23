"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const mongoose_1 = require("mongoose");
exports.p = {
    string: { type: mongoose_1.SchemaTypes.String, required: true },
    number: { type: mongoose_1.SchemaTypes.Number, required: true },
    boolean: { type: mongoose_1.SchemaTypes.Boolean, required: true },
    date: { type: mongoose_1.SchemaTypes.Date, required: true },
    mixed: { type: mongoose_1.SchemaTypes.Mixed, requied: true }
};
