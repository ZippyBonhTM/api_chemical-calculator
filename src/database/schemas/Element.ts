import { Schema, SchemaTypes } from "mongoose";
import { p } from "../utils";
import { ElementCategory, ElementState } from "../../types/ElementAtributes";
import validateElectronConfig from "../../validators/ValidateElectronConfig";

const ValueWithLinkSchema = new Schema({
  value: p.mixed,
  link: {
    type: SchemaTypes.String,
    required: false,
    validate: {
      validator: (v: string) => !v || /^https?:\/\/.+/.test(v),
      message: (props: any) => `${props.value} is not a valid URL!`,
    },
  },
}, { _id: false });

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
        validator: (v: any) => Object.values(ElementCategory).includes(v.value),
        message: (props: any) => `${props.value} is not a valid ElementCategory!`,
      },
      {
        validator: (v: any) => v.value !== ElementCategory.METALS,
        message: 'METALS category is reserved and cannot be used for especific elements!',
      },
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
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => validateElectronConfig(v.value).isValid,
      message: (props: any) => `${props.value} is not a valid electron configuration. Erros: ${validateElectronConfig(props.value).errors.join(", ")}` 
    }
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
  block: {
    type: SchemaTypes.String,
    required: true,
    enum: {
      values: ["s", "p", "d", "f"],
      message: "{VALUE} is not a valid block! use s, p, d, or f!"
    }
  },
});

export default ElementSchema;
