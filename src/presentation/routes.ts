import { Router } from "express";
import { PrestamistaRoutes } from "./prestamista/prestamista.routes";
import { ServicioRoutes } from "./servicio/servicio.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/prestamista", PrestamistaRoutes.routes);
    router.use("/api/servicio", ServicioRoutes.routes);

    return router;
  }
}
