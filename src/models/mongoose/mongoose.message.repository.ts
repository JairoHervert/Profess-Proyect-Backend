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
      senderName: savedMessage.senderName,
      receiverName: savedMessage.receiverName,
      senderOccupation: savedMessage.senderOccupation,
      receiverOccupation: savedMessage.receiverOccupation,
      senderPathProfilePicture: savedMessage.senderPathProfilePicture,
      receiverPathProfilePicture: savedMessage.receiverPathProfilePicture,
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
      senderName: message.senderName,
      receiverName: message.receiverName,
      senderOccupation: message.senderOccupation,
      receiverOccupation: message.receiverOccupation,
      senderPathProfilePicture: message.senderPathProfilePicture,
      receiverPathProfilePicture: message.receiverPathProfilePicture,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }

  async getOnlyLastChats(userEmail: string): Promise<MessageEntity[]> {
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
              then: '$receiverEmail',
              else: '$senderEmail',
            },
          },
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: '$otherUser',
          lastMessage: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$lastMessage' },
      },
      {
        $project: {
          _id: 1,
          senderEmail: 1,
          receiverEmail: 1,
          senderName: 1,
          receiverName: 1,
          senderOccupation: 1,
          receiverOccupation: 1,
          senderPathProfilePicture: 1,
          receiverPathProfilePicture: 1,
          timestamp: 1,
          content: 1,
        },
      },
    ]).sort({ timestamp: -1 });

    return messages.map(message => ({
      _id: message._id,
      senderEmail: message.senderEmail,
      receiverEmail: message.receiverEmail,
      senderName: message.senderName,
      receiverName: message.receiverName,
      senderOccupation: message.senderOccupation,
      receiverOccupation: message.receiverOccupation,
      senderPathProfilePicture: message.senderPathProfilePicture,
      receiverPathProfilePicture: message.receiverPathProfilePicture,
      timestamp: message.timestamp,
      content: message.content,
    }));
  }

  // Metodo para obtener solo las listas de archivos enviados entre dos usuarios
  async getOnlySharedFiles(senderEmail: string, receiverEmail: string): Promise<string[]> {
    try {
      const messages = await MessageModel.aggregate([
        {
          $match: {
            $or: [
              { senderEmail, receiverEmail },
              { senderEmail: receiverEmail, receiverEmail: senderEmail },
            ],
          },
        },
        {
          $match: {
            'content.filename': { $exists: true },
            'content.filepath': { $exists: true },
          },
        },
        {
          $project: {
            _id: 0,
            fileLink: '$content.filepath',
          },
        },
      ]);

      return messages.map(message => message.fileLink);
    } catch (error) {
      console.error('Error al obtener los enlaces de archivos compartidos:', error);
      return [];
    }
  }
}
