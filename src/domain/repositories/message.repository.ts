// repository for messages
import { CreateMessageDto } from '../dtos/message.dto';
import { MessageEntity } from '../entities/message.entity';

export interface MessageRepository {
  create(data: CreateMessageDto): Promise<MessageEntity>;
  findById(id: string): Promise<MessageEntity | null>;
  findBySender(sender: string): Promise<MessageEntity[]>;
  findByReceiver(receiver: string): Promise<MessageEntity[]>;
  findBySenderAndReceiver(sender: string, receiver: string): Promise<MessageEntity[]>;
}