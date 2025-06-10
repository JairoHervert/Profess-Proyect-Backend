import { Router } from 'express';
import { MessagesChatController } from './message.controller';

export class MessagesChatRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MessagesChatController();
    // const controller = new MessagesChatController();

    // router.post('/send', controller.sendMessage);
    // router.get('/messages/:sender/:receiver', controller.getMessagesBySenderAndReceiver);
    // router.get('/messages/sender/:sender', controller.getMessagesBySender);
    // router.get('/messages/receiver/:receiver', controller.getMessagesByReceiver);
    // Ruta para enviar un mensaje
    
    router.post('/send', controller.sendMessage);

    return router;
  }
}