import { MessageRepository } from '../../domain/repositories/message.repository';
import { CreateMessageDto } from '../../domain/dtos/message.dto';
import { MessageEntity } from '../../domain/entities/message.entity';
import MessageModel from '../../config/mongoose/msgSchema';

export class MongooseMessageRepository implements MessageRepository {
  async create(data: CreateMessageDto): Promise<MessageEntity> {
    // Consultar datos adicionales como el nombre del remitente y del destinatario
    // en la base de datos SQL
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
    const messages = await MessageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ timestamp: 1 });

    return messages.map(message => ({
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }


  // Funciones nuevas agregadas durante el desarrollo

  async getUniqueChats(user: string): Promise<MessageEntity[]> {

    // Antes de obtener los mensajes tendria que ir a consultar
    // los demas datos en la base de datos sql 

    const messages = await MessageModel.aggregate([
      {
        $match: {
          $or: [
            { sender: user },
            { receiver: user }
          ]
        }
      },
      {
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ['$sender', user] },
              then: '$receiver',
              else: '$sender'
            }
          }
        }
      },
      {
        $group: {
          _id: '$otherUser',
          lastMessage: { $last: '$$ROOT' }
        }
      },
      {
        $project: {
          _id: 0,
          sender: '$lastMessage.sender',
          receiver: '$lastMessage.receiver',
          timestamp: '$lastMessage.timestamp',
          content: '$lastMessage.content'
        }
      }
    ]).sort({ timestamp: -1 });

    return messages.map(message => ({
      _id: message._id,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }

}
