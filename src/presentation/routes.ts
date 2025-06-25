import { Router } from 'express';
import { PrestamistaRoutes } from './prestamista/prestamista.routes';
import { ServicioRoutes } from './servicio/servicio.routes';
import { MessagesChatRoutes } from './messages/messages.routes';
import { ClientRoutes } from './client/client.routes';
import { UserRoutes } from './user/user.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/prestamista', PrestamistaRoutes.routes);
    router.use('/api/chat', MessagesChatRoutes.routes);
    router.use('/api/cliente', ClientRoutes.routes);
    router.use('/api/servicio', ServicioRoutes.routes);
    router.use('/api/user', UserRoutes.routes);

    return router;
  }
}
