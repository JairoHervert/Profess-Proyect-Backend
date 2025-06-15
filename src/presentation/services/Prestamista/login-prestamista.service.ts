import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { LoginPrestamistaDto } from '../../../domain/dtos/prestamista-login.dto';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';

export class LoginPrestamistaService {
  constructor(
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(data: LoginPrestamistaDto) {
    const exists =
      (await this.prestamistaRepo.findByCorreo(data.correo)) ||
      (await this.clientRepo.findByCorreo(data.correo));
    if (!exists) {
      throw new Error('El correo no está registrado');
    }

    const isPasswordValid = bcryptAdapter.compare(data.contraseña, exists.contraseña);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = await JwtAdapter.generateToken({
      prestamista_id: exists.id,
      correo: exists.correo,
    });

    return {
      prestamista_id: exists.id,
      correo: exists.correo,
      token: token,
    };
  }
}
