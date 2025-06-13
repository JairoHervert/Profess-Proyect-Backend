import { ClientRepository } from '../../../domain/repositories/client.repository';
import { CreateClientDto } from '../../../domain/dtos/client-register.dto';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';

export class CreateClientService {
  constructor(private readonly repo: ClientRepository) {}

  async execute(data: CreateClientDto) {
    const exists = await this.repo.findByCorreoInClient(data.correo) || await this.repo.findByCorreoInPrestamista(data.correo);
    if (exists) {
      throw new Error('El correo ya está en uso');
    }

    const hashedPassword = bcryptAdapter.hash(data.contraseña);

    const client = await this.repo.create({
      ...data,
      contraseña: hashedPassword,
    });

    const token = await JwtAdapter.generateToken({
      client_id: client.id,
      correo: client.correo,
    });

    return {
      client_id: client.id,
      correo: client.correo,
      token: token,
    };
  }
}