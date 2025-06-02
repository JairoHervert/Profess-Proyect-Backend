import { Router } from "express";
import { PrestamistaRoutes } from "./prestamista/prestamista.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/prestamista", PrestamistaRoutes.routes);

    return router;
  }
}
