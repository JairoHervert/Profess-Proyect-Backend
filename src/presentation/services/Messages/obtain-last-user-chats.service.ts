import { MessageRepository } from '../../../domain/repositories/message.repository';
import { MessageEntity } from '../../../domain/entities/message.entity';

export class ObtainLastUserChatsService {
  constructor(private readonly repo: MessageRepository) {}

  async execute(userEmail: string): Promise<MessageEntity[]> {
    const chats = await this.repo.getOnlyLastChats(userEmail);
    if (!chats || chats.length === 0) {
      // Si no hay chats, retornar un array vacio. No mando un error porque no es un error que no haya chats
      return [];
    }
    return chats;
  }
}
