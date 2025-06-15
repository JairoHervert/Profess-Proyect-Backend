import mongoose, { Schema } from 'mongoose';

interface Message {
  senderEmail: string;
  receiverEmail: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}

const messageSchema = new Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const MessageModel = mongoose.model<Message>('Message', messageSchema);
export default MessageModel;
