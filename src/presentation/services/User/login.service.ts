import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { LoginUserDto } from '../../../domain/dtos/user-login.dto';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';

export class LoginService {
  constructor(
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(data: LoginUserDto) {
    const existsPrestamista = await this.prestamistaRepo.findByCorreo(data.correo);
    const existsClient = await this.clientRepo.findByCorreo(data.correo);
    const exists = existsPrestamista || existsClient;

    if (!exists) {
      throw new Error('El correo no está registrado');
    }

    let role = 'prestamista';
    if (!existsPrestamista) role = 'cliente';
    else role = 'prestamista';

    const isPasswordValid = bcryptAdapter.compare(data.contraseña, exists.contraseña);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = await JwtAdapter.generateToken({
      id: exists.id,
      name: exists.nombre,
      email: exists.correo,
      role: role,
    });

    return {
      id: exists.id,
      name: exists.nombre,
      email: exists.correo,
      role: role,
      token: token,
    };
  }
}
