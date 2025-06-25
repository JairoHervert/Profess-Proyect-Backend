import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';
import crypto from 'crypto';
import axios from 'axios';

export class RegisterGoogleClientService {
  constructor(
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(data: { accessToken: string }) {
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    const correo = userInfo.data.email;
    const nombre = userInfo.data.name || 'Sin nombre';
    const foto = userInfo.data.picture || undefined;

    const exists =
      (await this.prestamistaRepo.findByCorreo(correo)) ||
      (await this.clientRepo.findByCorreo(correo));
    if (exists) {
      throw new Error('El correo ya está en uso');
    }

    const contraseña = crypto.randomBytes(10).toString('hex');
    const hashed = bcryptAdapter.hash(contraseña);

    const cliente = await this.clientRepo.create({
      correo,
      nombre,
      linkFoto: foto,
      contraseña: hashed,
      correoVerificado: true,
    });

    const token = await JwtAdapter.generateToken({
      id: cliente.id,
      name: cliente.nombre,
      email: cliente.correo,
      role: 'cliente',
    });

    return {
      id: cliente.id,
      name: cliente.nombre,
      email: cliente.correo,
      role: 'cliente',
      token: token,
    };
  }
}
