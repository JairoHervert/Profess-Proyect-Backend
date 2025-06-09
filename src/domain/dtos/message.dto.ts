export interface CreateMessageDto {
  sender: string;
  receiver: string;
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}
