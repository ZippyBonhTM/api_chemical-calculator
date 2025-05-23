import { NextFunction, Request, Response } from "express";
import { ElementType } from "../types/ElementAtributes";
import { db } from "../database";


export default class ElementController {
  /**
  * Cria um novo elemento como base nos dados fornecidos.
  * @param req - Requisição contendo os dados do elemento (name, symbol...).
  * @param res - Resposta para enviar o resultado da criação.
  * @returns Resposta com status 201 e os dados do elemento criado.
  * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
  * @example
  * ```typescript
  * const req = { body: { name: "Test", symbol: "Te", ... }};
  * await ElementController.create(req, res);
  * ```
  */
  static async createElement(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const protoElement: ElementType = req.body;

      await db.elements.create(protoElement);

      res.status(201).json({ message: "Elemento criado com sucesso!" });
    } catch (err) {
      next(err);
    }
  }

  /**
  * Ver todos os elementos.
  * @param _ - (req) Requisição.
  * @param res - Resposta para enviar o resultado da criação.
  * @returns Resposta com status 200 e os dados.
  * @throws Lança erro se houver falha no banco de dados.
  * @example
  * ```typescript
  * await ElementController.getAllElements();
  * ```
  */
  static async getAllElements(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allElements = await db.elements.find();

      res.status(200).json(allElements);
    } catch (err) {
      next(err);
    }
  }
};