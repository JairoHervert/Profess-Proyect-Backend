import { MessageRepository } from '../../domain/repositories/message.repository';
import { CreateMessageDto } from '../../domain/dtos/message.dto';
import { MessageEntity } from '../../domain/entities/message.entity';
import MessageModel from '../../config/mongoose/msgSchema';

export class MongooseMessageRepository implements MessageRepository {
  async create(data: CreateMessageDto): Promise<MessageEntity> {
    const message = new MessageModel(data);
    const savedMessage = await message.save();

    return {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      receiver: savedMessage.receiver,
      timestamp: savedMessage.timestamp,
      content: savedMessage.content,
    };
  }

  async findById(id: string): Promise<MessageEntity | null> {
    const message = await MessageModel.findById(id);
    if (!message) return null;
    return {
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    };
  }

  async findBySender(sender: string): Promise<MessageEntity[]> {
    const messages = await MessageModel.find({ sender });
    return messages.map(message => ({
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }
  
  async findByReceiver(receiver: string): Promise<MessageEntity[]> {
    const messages = await MessageModel.find({ receiver });
    return messages.map(message => ({
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }

  async findBySenderAndReceiver(sender: string, receiver: string): Promise<MessageEntity[]> {
    const messages = await MessageModel.find({ sender, receiver });
    return messages.map(message => ({
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }
}


// import { Request, Response } from 'express';
// import MessageModel from '../../config/mongoose/msgSchema';

// export const sendMessage = async (req : Request, res : Response) => {

//   // Instanciamos el modelo de usuario, sustituimos la password por la version encriptada
//   // y guardamos el usuario en la base de datos
//   const message = new MessageModel(req.body);

//   await message.save();
//   res.status(201).send('Message created successfully');
// }