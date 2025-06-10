import { Request, Response } from 'express';
import { MongooseMessageRepository } from '../../models/mongoose/mongoose.message.repository';
import { CreateMessageService } from '../services/Messages/create-message.service';
import { ObtainLastUserChatsService } from '../services/Messages/obtain-last-user-chats.service';

export class MessagesChatController {
  private readonly createMessageService = new CreateMessageService(
    new MongooseMessageRepository(),
  );

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public sendMessage = (req: Request, res: Response) => {
    this.createMessageService
      .execute(req.body)
      .then(async (message) => res.json(message))
      .catch((error) => this.handleError(error, res));
  };

  public obtainLastUserChats = (req: Request, res: Response) => {
    const sender = req.params.sender;
    const obtainLastUserChatsService = new ObtainLastUserChatsService(
      new MongooseMessageRepository(),
    );
    obtainLastUserChatsService
      .execute(sender)
      .then(async (messages) => res.json(messages))
      .catch((error) => this.handleError(error, res));
  }
}