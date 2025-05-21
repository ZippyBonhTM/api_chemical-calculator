import { Schema } from "mongoose";
import { p } from "../utils";
import { ElementCategory, ElementState } from "../../types/Element";

const ValueWithLinkSchema = new Schema({
  value: p.mixed,
  link: p.string,
});

const ElectronConfigurationSchema = new Schema({
  subshell: p.string,
  electrons: p.number,
});



// FAZER O VALIDATOR DO ELECTRONCONFIGURATION NO ELEMENTSCHEMA!!!!!



const ElementSchema = new Schema({
  name: { type: ValueWithLinkSchema, required: true },
  symbol: { type: ValueWithLinkSchema, required: true },
  atomicNumber: { type: ValueWithLinkSchema, required: true },
  atomicWeight: { type: ValueWithLinkSchema, required: true },
  category: {
    type: ValueWithLinkSchema,
    required: true,
    validate: [
      {
        validator: function (v: any) {
          return Object.values(ElementCategory).includes(v.value);
        },
        message: (props: any) => `${props.value} is not a valid ElementCategory!`,
      },
      {
        validator: function (v: any) {
          return v.value !== ElementCategory.METALS;
        },
        message: 'METALS category is reserved and cannot be used for especific elements!',
      }
    ],
  },
  stateAtRoomTemp: {
    type: ValueWithLinkSchema,
    require: true,
    validate: {
      validator: function (v: any) {
        return Object.values(ElementState).includes(v.value);
      },
      message: (props: any) => `${props.value} is not a valid ElementState!`,
    },
  },
  meltingPoint: { type: ValueWithLinkSchema, required: false },
  boilingPoint: { type: ValueWithLinkSchema, required: false },
  electronConfiguration: {
    type: { type: ValueWithLinkSchema }
  },
  description: { type: ValueWithLinkSchema, required: false },
  uses: { type: ValueWithLinkSchema, required: false },
  history: { type: ValueWithLinkSchema, required: false },
  interestingFacts: { type: ValueWithLinkSchema, required: false },
  moreInfoLink: { type: ValueWithLinkSchema, required: false },
  position: {
    group: p.number,
    period: p.number
  },
  block: p.string,
});

export default ElementSchema;
