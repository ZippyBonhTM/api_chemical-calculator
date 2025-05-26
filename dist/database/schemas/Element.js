"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const ElementAtributes_1 = require("../../types/ElementAtributes");
const ValidateElectronConfig_1 = __importDefault(require("../../validators/ValidateElectronConfig"));
const ValueWithLinkSchema = new mongoose_1.Schema({
    value: utils_1.p.mixed,
    link: {
        type: mongoose_1.SchemaTypes.String,
        required: false,
        validate: {
            validator: (v) => !v || /^https?:\/\/.+/.test(v),
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
}, { _id: false });
const ElementSchema = new mongoose_1.Schema({
    name: { type: ValueWithLinkSchema, required: true },
    symbol: { type: ValueWithLinkSchema, required: true },
    atomicNumber: { type: ValueWithLinkSchema, required: true },
    atomicWeight: { type: ValueWithLinkSchema, required: true },
    category: {
        type: ValueWithLinkSchema,
        required: true,
        validate: [
            {
                validator: (v) => Object.values(ElementAtributes_1.ElementCategory).includes(v.value),
                message: (props) => `${props.value} is not a valid ElementCategory!`,
            },
            {
                validator: (v) => v.value !== ElementAtributes_1.ElementCategory.METALS,
                message: 'METALS category is reserved and cannot be used for especific elements!',
            },
        ],
    },
    stateAtRoomTemp: {
        type: ValueWithLinkSchema,
        require: true,
        validate: {
            validator: function (v) {
                return Object.values(ElementAtributes_1.ElementState).includes(v.value);
            },
            message: (props) => `${props.value} is not a valid ElementState!`,
        },
    },
    meltingPoint: { type: ValueWithLinkSchema, required: false },
    boilingPoint: { type: ValueWithLinkSchema, required: false },
    electronConfiguration: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => (0, ValidateElectronConfig_1.default)(v.value).isValid,
            message: (props) => `${props.value} is not a valid electron configuration. Erros: ${(0, ValidateElectronConfig_1.default)(props.value).errors.join(", ")}`
        }
    },
    description: { type: ValueWithLinkSchema, required: false },
    uses: { type: ValueWithLinkSchema, required: false },
    history: { type: ValueWithLinkSchema, required: false },
    interestingFacts: { type: ValueWithLinkSchema, required: false },
    moreInfoLink: { type: ValueWithLinkSchema, required: false },
    position: {
        group: utils_1.p.number,
        period: utils_1.p.number
    },
    block: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        enum: {
            values: ["s", "p", "d", "f"],
            message: "{VALUE} is not a valid block! use s, p, d, or f!"
        }
    },
});
exports.default = ElementSchema;
