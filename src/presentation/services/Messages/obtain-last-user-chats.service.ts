import { MessageRepository } from "../../../domain/repositories/message.repository";
import { CreateMessageDto } from "../../../domain/dtos/message.dto";

export class ObtainLastUserChatsService {
  constructor(private readonly repo: MessageRepository) {}

  async execute(sender: string): Promise<CreateMessageDto[]> {
    // Obtener los mensajes enviados por el usuario
    const sentMessages = await this.repo.findBySender(sender);
    return sentMessages.map(message => ({
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }
}