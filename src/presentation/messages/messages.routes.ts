import { Router } from 'express';
import { sendMessage } from '../../models/mongoose/mongoose.message.repository'
// import { MessagesChatController } from './messages.chat.controller';

export class MessagesChatRoutes {
  static get routes(): Router {
    const router = Router();
    // const controller = new MessagesChatController();

    // router.post('/send', controller.sendMessage);
    // router.get('/messages/:sender/:receiver', controller.getMessagesBySenderAndReceiver);
    // router.get('/messages/sender/:sender', controller.getMessagesBySender);
    // router.get('/messages/receiver/:receiver', controller.getMessagesByReceiver);
    
    // una prueba de respuesta
    router.get('/test', (req, res) => {
      res.json({ message: 'Messages Chat API is working!' });
    });

    // Ruta para enviar un mensaje
    router.post('/send', sendMessage);

    return router;
  }
}