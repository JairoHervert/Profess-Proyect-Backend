import { OAuth2Client } from 'google-auth-library';
import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';
import crypto from 'crypto';

const cliente = new OAuth2Client(
  '203718264011-i035nbljo1gq6bvpr531lq4fsa2bdbmg.apps.googleusercontent.com'
);

export class RegisterPrestamistaGoogleService {
  constructor(private readonly repo: PrestamistaRepository) {}

  async execute(idToken: string) {
    const ticket = await cliente.verifyIdToken({
      idToken,
      audience: '203718264011-i035nbljo1gq6bvpr531lq4fsa2bdbmg.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new Error('Token inválido');
    }

    const correo = payload.email;
    const nombre = payload.name || 'Sin nombre'; //* Ver qué pedo aquí
    const foto = payload.picture || undefined;

    const exists = await this.repo.findByCorreo(correo);
    if (exists) {
      throw new Error('El correo ya está en uso');
    }

    const contraseña = crypto.randomBytes(10).toString('hex');
    const hashed = bcryptAdapter.hash(contraseña);

    const prestamista = await this.repo.create({
      correo,
      nombre,
      tipoEntidad: 'persona',
      linkFoto: foto,
      contraseña: hashed,
    });

    const token = await JwtAdapter.generateToken({
      prestamista_id: prestamista.id,
      correo,
    });

    return {
      prestamista_id: prestamista.id,
      correo,
      token,
    };
  }
}
