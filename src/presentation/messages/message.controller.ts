import { Request, Response } from 'express';
import { MongooseMessageRepository } from '../../models/mongoose/mongoose.message.repository';
import { CreateMessageService } from '../services/Messages/create-message.service';
import { ObtainLastUserChatsService } from '../services/Messages/obtain-last-user-chats.service';
import { ObtainChatService } from '../services/Messages/obtain-chat.service';

export class MessagesChatController {
  // Instancias de los servicios
  private readonly createMessageService = new CreateMessageService(new MongooseMessageRepository());
  private readonly obtainLastUserChatsService = new ObtainLastUserChatsService(new MongooseMessageRepository());
  private readonly obtainChatService = new ObtainChatService(new MongooseMessageRepository());

  // Manejo de errores
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  // Metodo para enviar un mensaje
  public sendMessage = (req: Request, res: Response) => {
    this.createMessageService
      .execute(req.body)
      .then(async (message) => res.json(message))
      .catch((error) => this.handleError(error, res));
  };

  // Metodo para obtener los ultimos chats de un usuario (iran en el menu de chats)
  public obtainLastUserChats = (req: Request, res: Response) => {
    const sender = req.params.sender;

    this.obtainLastUserChatsService
      .execute(sender)
      .then(async (messages) => res.json(messages))
      .catch((error) => this.handleError(error, res));
  }

  // Metodo para obtener un chat entre dos usuarios
  public obtainOneChat = (req: Request, res: Response) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;

    this.obtainChatService
      .execute(sender, receiver)
      .then(async (messages) => res.json(messages))
      .catch((error) => this.handleError(error, res));
  }
}