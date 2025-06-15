import { MessageRepository } from '../../../domain/repositories/message.repository';
import { MessageEntity } from '../../../domain/entities/message.entity';

export class ObtainLastUserChatsService {
  constructor(private readonly repo: MessageRepository) {}

  async execute(user: string): Promise<MessageEntity[]> {
    const chats = await this.repo.getUniqueChats(user);
    if (!chats || chats.length === 0) {
      throw new Error('No se encontraron chats para el usuario especificado');
    }
    return chats;
  }
}
