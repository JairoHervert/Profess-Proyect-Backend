import { Router } from 'express';
import { MessagesChatController } from './message.controller';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware';

export class MessagesChatRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MessagesChatController();

    router.post('/send', controller.sendMessage);
    router.get('/last-messages/:sender/', controller.obtainLastUserChats);
    router.get('/messages/:sender/:receiver', controller.obtainOneChat);
    // router.post('/send', [AuthMiddleware.validateJWT] ,controller.sendMessage);
    // router.get('/last-messages/:sender/', [AuthMiddleware.validateJWT] , controller.obtainLastUserChats);
    // router.get('/messages/:sender/:receiver', [AuthMiddleware.validateJWT] , controller.obtainOneChat);

    return router;
  }
}
