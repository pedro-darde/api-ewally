import { Router } from "express";
import BoletoController from "./controllers/BoletoController";

const routes = Router();

routes.get("/boleto/:codigo", BoletoController.get);

export default routes;
