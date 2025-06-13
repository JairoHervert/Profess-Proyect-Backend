import mongoose from 'mongoose';

export interface MessageEntity {
  _id: mongoose.Types.ObjectId;
  senderEmail: string;
  receiverEmail: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}
