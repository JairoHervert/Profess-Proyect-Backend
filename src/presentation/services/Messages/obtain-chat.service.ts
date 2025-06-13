import { MessageRepository } from '../../../domain/repositories/message.repository';
import { MessageEntity } from '../../../domain/entities/message.entity';

export class ObtainChatService {
  constructor(private readonly repo: MessageRepository) {}

  async execute(sender: string, receiver: string): Promise<MessageEntity[]> {
    if (sender === receiver) {
      throw new Error('El remitente y el destinatario no pueden ser iguales');
    }

    const messages = await this.repo.findBySenderAndReceiver(sender, receiver);
    if (!messages || messages.length === 0) {
      throw new Error('No se encontraron mensajes entre los usuarios especificados');
    }

    return messages;
  }
}
