import { InferSchemaType, model } from "mongoose";
import ElementSchema from "./schemas/Element";

// FAZER A CONEXÃO COM O BANCO DE DADOS!!

export const db = {
  // users: model("user", UserSchema, "users"),
  elements: model("element", ElementSchema, "elements")
};

// export type UserSchema = InferSchemaType<typeof UserSchema>;
export type ElementSchema = InferSchemaType<typeof ElementSchema>;
