import mongoose, { Schema } from 'mongoose';

interface Message {
  id : string;
  sender: string;
  receiver: string;
  timestamp: Date;
  content: string | { filename: string; filepath: string };
}

const messageSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const MessageModel = mongoose.model<Message>('Message', messageSchema);
export default MessageModel;