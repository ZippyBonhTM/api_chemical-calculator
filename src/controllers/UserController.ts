import db from "@db";
import { NextFunction, Request, Response } from "express";
import { zodCreateUser } from "./zodUser";
import { toSafeUser } from "./utils/userUtils/userMappers";

export default class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userProto = await zodCreateUser.safeParseAsync(req.body);
      if (!userProto.success) {
        res.status(400).json({ message: userProto.error });
        return
      }
      const createdUser = await db.users.create(userProto.data);

      const safeUser = toSafeUser(createdUser);

      res.status(201).json(safeUser);
      return
    } catch (err) {
      next(err);
      return
    }
  }
}
