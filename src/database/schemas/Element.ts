import { Schema, SchemaTypes, ValidatorProps } from "mongoose";
import { p } from "../utils";
import { ElementCategory, ElementState } from "../../types/ElementAtributes";
import validateElectronConfig from "../../validators/ValidateElectronConfig";
import validateOxidationStates from "validators/ValidateOxidationStates";

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
  name: p.string,
  symbol: {
    ...p.string,
    required: true,
    validate: {
      validator: (v: string) => v.length > 0 && v.length < 3,
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid symbol! Must be string and have 1 or 2 characters!`
    }
  },
  atomicNumber: {
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid atomicNumber!`
    }
  },
  atomicWeight: {
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid atomicWeight!`
    }
  },
  category: {
    type: ValueWithLinkSchema,
    required: true,
    validate: [
      {
        validator: (v: any) => {
          if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
            return false;
          }
          return Object.values(ElementCategory).includes(v.value);
        },
        message: (props: ValidatorProps) => `${props.value?.value} is not a valid category!`,
      },
      {
        validator: (v: any) => v.value !== ElementCategory.METALS,
        message: 'METALS category is reserved and cannot be used for specific elements!',
      },
    ],
  },
  stateAtRoomTemp: {
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return Object.values(ElementState).includes(v.value);
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid ElementState!`,
    },
  },
  meltingPoint: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid melting point!`
    }
  },
  boilingPoint: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid boiling point!`
    }
  },
  density: {
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid electron configuration! Erros: ${validateElectronConfig(props.value).errors.join(", ")}`
    }
  },
  electronConfiguration: {
    type: ValueWithLinkSchema,
    required: true,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return validateElectronConfig(v.value).isValid;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid electron configuration! Erros: ${validateElectronConfig(props.value).errors.join(", ")}`
    }
  },
  electronegativity: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid eletronegativity!`
    },
  },
  atomicRadius: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid atomic radios!`
    }
  },
  ionizationEnergy: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid ionization energy!`
    }
  },
  electronAffinity: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "number") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid electron affinity!`
    }
  },
  oxidationStates: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return validateOxidationStates(v.value).isValid;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid oxidation state.`
    }
  },
  description: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid description!`
    }
  },
  uses: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid uses!`
    }
  },
  history: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid history!`
    }
  },
  interestingFacts: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => {
        if (!v || typeof v !== "object" || !("value" in v) || typeof v.value !== "string") {
          return false;
        }
        return true;
      },
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid interesting facts!`
    }
  },
  moreInfoLink: {
    type: ValueWithLinkSchema,
    required: false,
    validate: {
      validator: (v: any) => !v || /^https?:\/\/.+/.test(v),
      message: (props: ValidatorProps) => `${props.value?.value} is not a valid more info link!`
    }
  },
  position: {
    group: p.number,
    period: p.number
  },
});

export default ElementSchema;
