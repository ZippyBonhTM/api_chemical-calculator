import mongoose, { InferSchemaType, model } from "mongoose";
import ElementSchema from "./schemas/Element";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Não consegui encontrar a URI do MongoDB nas variáveis de ambiente!");

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB successfully!");
}).catch((err) => {
  console.error(`Error connection to MongoDB: ${err}`);
  process.exit(1);
});

const db = {
  // users: model("user", UserSchema, "users"),
  elements: model("element", ElementSchema, "elements")
};

// export type UserSchema = InferSchemaType<typeof UserSchema>;
export type ElementSchema = InferSchemaType<typeof ElementSchema>;

export default db;
