import { MessageProfileEntity } from '../entities/message-profile.entity';

export interface MessageProfileRepository {
  findByEmail(email: string): Promise<MessageProfileEntity | null>;
}
