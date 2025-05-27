import ElementController from "@controllers/ElementController";
import { Router } from "express";

const elementRoutes = Router();

elementRoutes
  .get("/api/v1/elements", ElementController.getAllElements)
  .get("/api/v1/elements/filter", ElementController.getElementsByFilter)
  .post("/api/v1/elements", ElementController.createElement)
  .delete("/api/v1/elements/:id", ElementController.deleteElementById)
  .put("/api/v1/elements/:id", ElementController.updateElementById)

export default elementRoutes;
