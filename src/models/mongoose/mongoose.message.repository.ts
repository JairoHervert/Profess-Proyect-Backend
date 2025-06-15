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
      senderEmail: savedMessage.senderEmail,
      receiverEmail: savedMessage.receiverEmail,
      sender: savedMessage.sender,
      receiver: savedMessage.receiver,
      timestamp: savedMessage.timestamp,
      content: savedMessage.content,
    };
  }

  async findBySenderAndReceiver(
    senderEmail: string,
    receiverEmail: string
  ): Promise<MessageEntity[]> {
    const messages = await MessageModel.find({
      $or: [
        { senderEmail, receiverEmail },
        { senderEmail: receiverEmail, receiverEmail: senderEmail },
      ],
    }).sort({ timestamp: 1 });

    return messages.map(message => ({
      _id: message._id,
      senderEmail: message.senderEmail,
      receiverEmail: message.receiverEmail,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }

  async getUniqueChats(userEmail: string): Promise<MessageEntity[]> {
    const messages = await MessageModel.aggregate([
      {
        $match: {
          $or: [{ senderEmail: userEmail }, { receiverEmail: userEmail }],
        },
      },
      {
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ['$senderEmail', userEmail] },
              then: '$receiver',
              else: '$sender',
            },
          },
        },
      },
      {
        $group: {
          _id: '$otherUser',
          lastMessage: { $last: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          sender: '$lastMessage.sender',
          receiver: '$lastMessage.receiver',
          timestamp: '$lastMessage.timestamp',
          content: '$lastMessage.content',
        },
      },
    ]).sort({ timestamp: -1 });

    return messages.map(message => ({
      _id: message._id,
      senderEmail: message.sender,
      receiverEmail: message.receiver,
      sender: message.sender,
      receiver: message.receiver,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }
}
