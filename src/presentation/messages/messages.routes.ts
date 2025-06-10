import { Router } from 'express';
import { MessagesChatController } from './message.controller';

export class MessagesChatRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MessagesChatController();
    
    router.post('/send', controller.sendMessage);
    router.get('/last-messages/:sender/', controller.obtainLastUserChats);
    router.get('/messages/:sender/:receiver', controller.obtainOneChat);
    
    return router;
  }
}