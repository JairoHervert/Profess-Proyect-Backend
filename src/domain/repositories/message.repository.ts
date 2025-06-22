import { CreateMessageDto } from '../dtos/message.dto';
import { MessageEntity } from '../entities/message.entity';

export interface MessageRepository {
  create(data: CreateMessageDto): Promise<MessageEntity>;
  getOnlyLastChats(userEmail: string): Promise<MessageEntity[]>;
  findBySenderAndReceiver(senderEmail: string, receiverEmail: string): Promise<MessageEntity[]>;
  getOnlySharedFiles(senderEmail: string, receiverEmail: string): Promise<string[]>;
}
