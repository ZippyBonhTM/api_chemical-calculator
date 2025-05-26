"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementStateInfo = exports.ElementCategoryInfo = exports.ElementState = exports.ElementCategory = void 0;
var ElementCategory;
(function (ElementCategory) {
    ElementCategory["NONMETALS"] = "nonmetals";
    ElementCategory["METALS"] = "metals";
    ElementCategory["NOBLE_GASES"] = "noble_gases";
    ElementCategory["ALKALI_METALS"] = "alkali_metals";
    ElementCategory["ALKALINE_EARTH_METALS"] = "alkaline_earth_metals";
    ElementCategory["TRANSITION_METALS"] = "transition_metals";
    ElementCategory["POST_TRANSITION_METALS"] = "post_transition_metals";
    ElementCategory["METALLOIDS"] = "metalloids";
    ElementCategory["HALOGENS"] = "halogens";
    ElementCategory["LANTHANIDES"] = "lanthanides";
    ElementCategory["ACTINIDES"] = "actinides";
})(ElementCategory || (exports.ElementCategory = ElementCategory = {}));
;
var ElementState;
(function (ElementState) {
    ElementState["SOLID"] = "solid";
    ElementState["LIQUID"] = "liquid";
    ElementState["GAS"] = "gas";
    ElementState["UNKNOWN"] = "unknown";
})(ElementState || (exports.ElementState = ElementState = {}));
;
exports.ElementCategoryInfo = {
    [ElementCategory.NONMETALS]: {
        label: "Nonmetals",
        color: "#8FC96E",
        infoLink: "https://en.wikipedia.org/wiki/Nonmetal",
    },
    [ElementCategory.NOBLE_GASES]: {
        label: "Noble Gases",
        color: "#77AADD",
        infoLink: "https://en.wikipedia.org/wiki/Noble_gas",
    },
    [ElementCategory.ALKALI_METALS]: {
        label: "Alkali Metals",
        color: "#E5B76E",
        infoLink: "https://en.wikipedia.org/wiki/Alkali_metal",
    },
    [ElementCategory.ALKALINE_EARTH_METALS]: {
        label: "Alkaline Earth Metals",
        color: "#F4DA70",
        infoLink: "https://en.wikipedia.org/wiki/Alkaline_earth_metal",
    },
    [ElementCategory.METALLOIDS]: {
        label: "Metalloids",
        color: "#73C6A5",
        infoLink: "https://en.wikipedia.org/wiki/Metalloid",
    },
    [ElementCategory.HALOGENS]: {
        label: "Halogens",
        color: "#A1D6E5",
        infoLink: "https://en.wikipedia.org/wiki/Halogen",
    },
    [ElementCategory.POST_TRANSITION_METALS]: {
        label: "Post Transition_Metals",
        color: "#A9C7D6",
        infoLink: "https://en.wikipedia.org/wiki/Post-transition_metal",
    },
    [ElementCategory.TRANSITION_METALS]: {
        label: "Transition Metals",
        color: "#EBA5AD",
        infoLink: "https://en.wikipedia.org/wiki/Transition_metal",
    },
    [ElementCategory.LANTHANIDES]: {
        label: "Lanthanides",
        color: "#8CC6CC",
        infoLink: "https://en.wikipedia.org/wiki/Lanthanide",
    },
    [ElementCategory.ACTINIDES]: {
        label: "Actinides",
        color: "#C8A3D6",
        infoLink: "https://en.wikipedia.org/wiki/Actinide",
    },
    [ElementCategory.METALS]: {
        label: "Metals",
        color: "#C8A3D1",
        infoLink: "https://en.wikipedia.org/wiki/Metals",
    },
};
exports.ElementStateInfo = {
    [ElementState.SOLID]: {
        label: "Solid",
        color: "#A52A2A",
        infoLink: "https://en.wikipedia.org/wiki/Solid",
    },
    [ElementState.LIQUID]: {
        label: "Liquid",
        color: "#1E90FF",
        infoLink: "https://en.wikipedia.org/wiki/Liquid",
    },
    [ElementState.GAS]: {
        label: "Gas",
        color: "#FFD700",
        infoLink: "https://en.wikipedia.org/wiki/Gas",
    },
    [ElementState.UNKNOWN]: {
        label: "Unknown",
        color: "#808080",
        infoLink: "https://en.wikipedia.org/wiki/State_of_matter",
    },
};
