import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { MessageRepository } from '../../../domain/repositories/message.repository';

export class ObtainContactInfoService {
  constructor(
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository,
    private readonly messageRepo: MessageRepository
  ) {}

  async execute(senderEmail: string, receiverEmail: string) {
    if (senderEmail === receiverEmail) {
      throw new Error('El remitente y el destinatario no pueden ser iguales');
    }

    // Buscar los datos del remitente y del destinatario en las bases de datos SQL
    const receiverData =
      (await this.prestamistaRepo.findByCorreo(receiverEmail)) ||
      (await this.clientRepo.findByCorreo(receiverEmail));
    if (!receiverData) {
      throw new Error('El destinatario no está registrado');
    }

    // Obtener los archivos compartidos en el chat entre el remitente y el destinatario
    const sharedFiles = await this.messageRepo.getOnlySharedFiles(senderEmail, receiverEmail);

    return {
      id: receiverData.id || '',
      contactName: receiverData.nombre || '',
      contactOccupation: receiverData.tipoEntidad || '',
      contactPathProfilePicture: receiverData.linkFoto || '',
      contactPhone: receiverData.telefono || '',
      contactRating: receiverData.calificacion || 0,
      sharedFiles: sharedFiles || [],
    };
  }
}
