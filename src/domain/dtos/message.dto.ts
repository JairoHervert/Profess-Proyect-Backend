export interface CreateMessageDto {
  senderEmail: string;
  receiverEmail: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}
