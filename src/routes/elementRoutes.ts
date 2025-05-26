import ElementController from "@controllers/ElementController";
import { Router } from "express";

const elementRoutes = Router();

elementRoutes.get("/api/v1/elements", ElementController.getAllElements);
elementRoutes.post("/api/v1/elements", ElementController.createElement);
elementRoutes.delete("/api/v1/elements/:id", ElementController.deleteElementById);
elementRoutes.put("/api/v1/elements/:id", ElementController.updateElementById);

export default elementRoutes;
