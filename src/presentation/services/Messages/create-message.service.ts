// importar repositorie, dto
import { MessageRepository } from "../../../domain/repositories/message.repository";
import { CreateMessageDto } from "../../../domain/dtos/message.dto";

export class CreateMessageService {
  constructor(private readonly repo: MessageRepository) { }

  async execute(data: CreateMessageDto) {
    // Validar que el remitente y el destinatario no sean iguales
    if (data.sender === data.receiver) {
      throw new Error("El remitente y el destinatario no pueden ser iguales");
    }

    // Crear el mensaje
    const message = await this.repo.create(data);

    // Retornar el mensaje creado
    return message;
  }
}