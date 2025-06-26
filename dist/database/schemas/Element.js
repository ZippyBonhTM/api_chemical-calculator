"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const ElementAtributes_1 = require("../../types/ElementAtributes");
const ValidateElectronConfig_1 = __importDefault(require("../../validators/ValidateElectronConfig"));
const ValidateOxidationStates_1 = __importDefault(require("../../validators/ValidateOxidationStates"));
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
    name: utils_1.p.string,
    symbol: Object.assign(Object.assign({}, utils_1.p.string), { required: true, validate: {
            validator: (v) => v.length > 0 && v.length < 3,
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid symbol! Must be string and have 1 or 2 characters!`; }
        } }),
    atomicNumber: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid atomicNumber!`; }
        }
    },
    atomicWeight: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid atomicWeight!`; }
        }
    },
    category: {
        type: ValueWithLinkSchema,
        required: true,
        validate: [
            {
                validator: (v) => {
                    if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                        return false;
                    }
                    return Object.values(ElementAtributes_1.ElementCategory).includes(v.value);
                },
                message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid category!`; },
            },
            {
                validator: (v) => v.value !== ElementAtributes_1.ElementCategory.METALS,
                message: 'METALS category is reserved and cannot be used for specific elements!',
            },
        ],
    },
    stateAtRoomTemp: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return Object.values(ElementAtributes_1.ElementState).includes(v.value);
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid ElementState!`; },
        },
    },
    meltingPoint: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid melting point!`; }
        }
    },
    boilingPoint: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid boiling point!`; }
        }
    },
    density: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid electron configuration! Erros: ${(0, ValidateElectronConfig_1.default)(props.value).errors.join(", ")}`; }
        }
    },
    electronConfiguration: {
        type: ValueWithLinkSchema,
        required: true,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return (0, ValidateElectronConfig_1.default)(v.value).isValid;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid electron configuration! Erros: ${(0, ValidateElectronConfig_1.default)(props.value).errors.join(", ")}`; }
        }
    },
    electronegativity: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid eletronegativity!`; }
        },
    },
    atomicRadius: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid atomic radios!`; }
        }
    },
    ionizationEnergy: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid ionization energy!`; }
        }
    },
    electronAffinity: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid electron affinity!`; }
        }
    },
    oxidationStates: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return (0, ValidateOxidationStates_1.default)(v.value).isValid;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid oxidation state.`; }
        }
    },
    description: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid description!`; }
        }
    },
    uses: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid uses!`; }
        }
    },
    history: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid history!`; }
        }
    },
    interestingFacts: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => {
                if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
                    return false;
                }
                return true;
            },
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid interesting facts!`; }
        }
    },
    moreInfoLink: {
        type: ValueWithLinkSchema,
        required: false,
        validate: {
            validator: (v) => !v || /^https?:\/\/.+/.test(v),
            message: (props) => { var _a; return `${(_a = props.value) === null || _a === void 0 ? void 0 : _a.value} is not a valid more info link!`; }
        }
    },
    position: {
        group: utils_1.p.number,
        period: utils_1.p.number
    },
});
exports.default = ElementSchema;
