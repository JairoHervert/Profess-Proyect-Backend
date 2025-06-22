import { Request, Response } from 'express';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { ObtainContactInfoService } from '../services/Messages/obtain-contact-info.service';
import { MongooseMessageRepository } from '../../models/mongoose/mongoose.message.repository';
import { CreateMessageService } from '../services/Messages/create-message.service';
import { ObtainLastUserChatsService } from '../services/Messages/obtain-last-user-chats.service';
import { ObtainChatService } from '../services/Messages/obtain-chat.service';

export class MessagesChatController {
  // Instancias de los servicios
  private readonly createMessageService = new CreateMessageService(
    new MongooseMessageRepository(),
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );
  private readonly obtainLastUserChatsService = new ObtainLastUserChatsService(new MongooseMessageRepository());
  private readonly obtainChatService = new ObtainChatService(new MongooseMessageRepository());

  private readonly obtainContactInfoService = new ObtainContactInfoService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository(),
    new MongooseMessageRepository(),
  );

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
      .then(async message => res.json(message))
      .catch(error => this.handleError(error, res));
  };

  // Metodo para obtener los ultimos chats de un usuario (iran en el menu de chats)
  public obtainLastUserChats = (req: Request, res: Response) => {
    const senderEmail = req.params.senderemail;

    this.obtainLastUserChatsService
      .execute(senderEmail)
      .then(async messages => res.json(messages))
      .catch(error => this.handleError(error, res));
  };

  // Metodo para obtener un chat entre dos usuarios
  public obtainOneChat = (req: Request, res: Response) => {
    const senderEmail = req.params.senderemail;
    const receiverEmail = req.params.receiveremail;

    this.obtainChatService
      .execute(senderEmail, receiverEmail)
      .then(async messages => res.json(messages))
      .catch(error => this.handleError(error, res));
  };

  // Metodo para obtener los datos de perfil de un usuario
  public obtainUserProfile = (req: Request, res: Response) => {
    const senderEmail = req.params.senderemail;
    const receiverEmail = req.params.receiveremail;

    this.obtainContactInfoService
      .execute(senderEmail, receiverEmail)
      .then(async contactInfo => res.json(contactInfo))
      .catch(error => this.handleError(error, res));
  };
}
