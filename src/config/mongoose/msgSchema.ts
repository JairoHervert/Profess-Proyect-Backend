import mongoose, { Schema } from 'mongoose';

interface Message {
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

const messageSchema = new Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    default: '',
  },
  receiverName: {
    type: String,
    default: '',
  },
  senderOccupation: {
    type: String,
    default: '',
  },
  receiverOccupation: {
    type: String,
    default: '',
  },
  senderPathProfilePicture: {
    type: String,
    default: '',
  },
  receiverPathProfilePicture: {
    type: String,
    default: '',
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
