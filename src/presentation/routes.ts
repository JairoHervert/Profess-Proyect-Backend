import { Router } from "express";
import { PrestamistaRoutes } from "./prestamista/prestamista.routes";
import { MessagesChatRoutes } from "./messages/messages.routes";
import { ClientRoutes } from "./client/client.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/prestamista", PrestamistaRoutes.routes);
    router.use("/api/chat", MessagesChatRoutes.routes);
    router.use("/api/client", ClientRoutes.routes);
    return router;
  }
}
