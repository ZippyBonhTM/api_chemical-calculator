import { NextFunction, Request, Response } from "express";
import { ElementType } from "../types/ElementAtributes";
import db from "../database";
import elementParamsProcessor from "./utils/elementParamsProcessor";

export default class ElementController {
  /**
  * Cria um novo elemento como base nos dados fornecidos.
  * @param req - Requisição contendo os dados do elemento (name, symbol...).
  * @param res - Resposta para enviar o resultado da criação.
  * @returns Resposta com status 201 e os dados do elemento criado.
  * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
  */
  static async createElement(req: Request, res: Response, next: NextFunction) {
    try {
      const protoElement: ElementType = req.body;

      const newElement = await db.elements.create(protoElement);

      res.status(201).send(newElement.toJSON());
    } catch (err) {
      next(err);
    }
  }

  /**
  * Ver todos os elementos.
  * @param _ - (req) Requisição.
  * @param res - Resposta para enviar o resultado da criação.
  * @returns Resposta com status 200 e os dados.
  * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
  */
  static async getAllElements(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query) {
        const filter = elementParamsProcessor(req.query);
        if (filter.errors.length === 0) {
          if (filter.query) {
            const elements = await db.elements.find(filter.query).lean().exec();
            res.status(200).send(elements);
          } else {
            res.status(200).send([]);
          }
        } else {
          res.status(400).json({ message: "Sua query params está inválida!", erros: filter.errors });
        }

      } else {
        const allElements = db.elements.find().lean().exec();
        res.status(200).json(allElements);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getElementById(req: Request, res: Response, next: NextFunction) {
    try {
      const elementId = req.params.id;

      const element = await db.elements.findById(elementId);

      if (!element) {
        res.status(400).json({ message: "Nenhum elemento foi encontrado!" });
      } else {
        res.status(200).send(element.toJSON());
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Edita um elemento já existente apartir do id do elemento e os dados em formato json.
   * @param req - Dados que serão utilizados (parâmetros de url: "id_do_elemento", body: "dados_a_serem_atualizados").
   * @param res - Resposta da requisição.
   * @returns Resposta com status 200 e o elemento editado.
   * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
   */
  static async updateElementById(req: Request, res: Response, next: NextFunction) {
    try {
      const ElementId = req.params.id;
      const ElementData = req.body;

      if (!ElementId || !ElementData) {
        res.status(400).json({
          message: "Um ou mais dados estão ausentes! Certifique-se de passar o id pelo parâmetro da url e os dados a serem atualizados!"
        });
      }

      const updatedElement = await db.elements.findByIdAndUpdate(ElementId, ElementData).lean().exec();

      res.status(200).json({ message: "Elemento editado com sucesso!", updatedElement });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deleta um elemento pelo ID do objeto que é gerado pelo MongoDB.
   * @param req - Requisição com o {id: ObjectId} do elemento.
   * @param res - Resposta da requisição.
   * @returns Resposta com status 200 e o elemento removido.
   * @throws Lança erro se os dados forem inválidos ou houver falha no banco de dados.
   */
  static async deleteElementById(req: Request, res: Response, next: NextFunction) {
    try {
      const elementId = req.params.id;

      const result = await db.elements.deleteOne({ _id: elementId });
      if (result.deletedCount === 0) res.status(304).json({ message: "Nenhum elemento foi encontrado para ser deletado!" });

      res.status(200).json({ message: "Elemento removido com sucesso!" });
    } catch (err) {
      next(err);
    }
  }
};
