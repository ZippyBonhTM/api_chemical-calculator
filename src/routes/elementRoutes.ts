import ElementController from "@controllers/ElementController";
import { Router } from "express";

const elementRoutes = Router();

elementRoutes.get("/api/v1/elements", ElementController.getAllElements);

export default elementRoutes;
