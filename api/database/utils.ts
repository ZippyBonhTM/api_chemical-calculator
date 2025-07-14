import { SchemaTypes } from "mongoose";

export const p = {
   string: { type: SchemaTypes.String, required: true },
   number: { type: SchemaTypes.Number, required: true },
   boolean: { type: SchemaTypes.Boolean, required: true },
   date: { type: SchemaTypes.Date, required: true },
   mixed: { type: SchemaTypes.Mixed, requied: true }
};
