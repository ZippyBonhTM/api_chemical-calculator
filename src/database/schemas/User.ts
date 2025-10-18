import { p } from "database/utils";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: p.string,
  email: p.string,
  passwordHash: p.string,
  jwtVersion: { type: p.number, default: 0 }
})

export default UserSchema;
