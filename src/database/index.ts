import { InferSchemaType, model } from "mongoose";
import UserSchema from "./schemas/User";



export const db = {
  users: model("user", UserSchema, "users"),
  elements: model("element", ElementSchema, "elements")
};

export type UserSchema = InferSchemaType<typeof UserSchema>;