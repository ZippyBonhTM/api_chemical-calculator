import { Schema } from "mongoose";
import { p } from "../utils";

const UserSchema = new Schema({
  userName: p.string, // Nome real
  displayName: p.string, // Nome público
  email: p.string, // Email
  enrollment: p.string, // Matrícula
  passwordHash: p.string // Senha em encriptada
});

export default UserSchema;