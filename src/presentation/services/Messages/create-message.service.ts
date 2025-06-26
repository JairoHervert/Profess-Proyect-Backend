import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { MessageRepository } from '../../../domain/repositories/message.repository';
import { CreateMessageDto } from '../../../domain/dtos/message.dto';

export class CreateMessageService {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(data: CreateMessageDto) {
    if (data.senderEmail === data.receiverEmail) {
      throw new Error('El remitente y el destinatario no pueden ser iguales');
    }

    // Extraer el nombre del remitente y del destinatario en la base de datos SQL
    const senderData =
      (await this.prestamistaRepo.findByCorreo(data.senderEmail)) ||
      (await this.clientRepo.findByCorreo(data.senderEmail));
    const receiverData =
      (await this.prestamistaRepo.findByCorreo(data.receiverEmail)) ||
      (await this.clientRepo.findByCorreo(data.receiverEmail));

    if (!senderData || !receiverData) {
      throw new Error('El remitente o el destinatario no están registrados');
    }

    // Asignar los nombres al objeto de datos
    const messageData = {
      ...data,
      senderName: senderData.nombre || '',
      receiverName: receiverData.nombre || '',
      senderOccupation: senderData.tipoEntidad || '',
      receiverOccupation: receiverData.tipoEntidad || '',
      senderPathProfilePicture: senderData.linkFoto,
      receiverPathProfilePicture: receiverData.linkFoto,
    };

    // Crear el mensaje
    const message = await this.messageRepo.create(messageData);
    return message;
  }
}
