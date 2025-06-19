import { MessageRepository } from '../../../domain/repositories/message.repository';
import { MessageEntity } from '../../../domain/entities/message.entity';

export class ObtainChatService {
  constructor(private readonly repo: MessageRepository) {}

  async execute(senderEmail: string, receiverEmail: string): Promise<MessageEntity[]> {
    if (senderEmail === receiverEmail) {
      throw new Error('El remitente y el destinatario no pueden ser iguales');
    }

    const messages = await this.repo.findBySenderAndReceiver(senderEmail, receiverEmail);
    if (!messages || messages.length === 0) {
      throw new Error('No se encontraron mensajes entre los usuarios especificados');
    }

    return messages;
  }
}
