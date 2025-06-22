import mongoose from 'mongoose';

export interface MessageEntity {
  _id: mongoose.Types.ObjectId;
  senderEmail: string;
  receiverEmail: string;

  senderName: string;
  receiverName: string;

  senderOccupation: string;
  receiverOccupation: string;

  senderPathProfilePicture?: string;
  receiverPathProfilePicture?: string;
  
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}
