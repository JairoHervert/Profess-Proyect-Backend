import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { JwtAdapter } from '../../../config/jwt.adapter';
import axios from 'axios';

export class LoginPrestamistaGoogleService {
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
    console.log('User info from Google:', userInfo.data);
    const { email } = userInfo.data;
    console.log('Email from Google:', email);

    // const exists =
    //   (await this.prestamistaRepo.findByCorreo(email)) ||
    //   (await this.clientRepo.findByCorreo(email));
    // if (!exists) {
    //   throw new Error('El correo no está registrado');
    // }
    const existsPrestamista = await this.prestamistaRepo.findByCorreo(email);
    const existsClient = await this.clientRepo.findByCorreo(email);
    const exists = existsPrestamista || existsClient;

    if (!exists) {
      throw new Error('El correo no está registrado');
    }

    let role = 'prestamista';
    if (!existsPrestamista) role = 'cliente';
    else role = 'prestamista';

    // No se requiere contraseña para el login con Google

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
