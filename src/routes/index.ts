import express, { Express } from "express";
import elementRoutes from "./elementRoutes";

const routes = (app: Express) => {
  app.route("/").get((_, res) => {
    res.status(200).send("OK");
  });

  app.use(
    express.json(),
    elementRoutes
    // userRoutes
  );
};

export default routes;
