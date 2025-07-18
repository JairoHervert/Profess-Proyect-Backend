export interface CreateMessageDto {
  senderEmail: string;
  receiverEmail: string;

  senderName: string;
  receiverName: string;

  receiverOccupation: string;
  senderOccupation: string;

  senderPathProfilePicture?: string;
  receiverPathProfilePicture?: string;

  timestamp: Date;
  content: string | { filename: string; filepath: string };
}
