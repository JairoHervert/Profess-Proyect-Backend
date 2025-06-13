import { PrestamistaRepository } from "../../../domain/repositories/prestamista.repository";
import { ClientRepository } from "../../../domain/repositories/client.repository";
import { CreatePrestamistaDto } from "../../../domain/dtos/prestamista-register.dto";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

export class CreatePrestamistaService {
  constructor(
    private readonly prestamistaRepo: PrestamistaRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(data: CreatePrestamistaDto) {
    const exists = await this.prestamistaRepo.findByCorreo(data.correo) || await this.clientRepo.findByCorreo(data.correo);
    if (exists) {
      throw new Error("El correo ya está en uso");
    }

    const hashedPassword = bcryptAdapter.hash(data.contraseña);

    const prestamista = await this.prestamistaRepo.create({
      ...data,
      contraseña: hashedPassword,
    });

    const token = await JwtAdapter.generateToken({
      prestamista_id: prestamista.id,
      correo: prestamista.correo,
    });

    return {
      prestamista_id: prestamista.id,
      correo: prestamista.correo,
      token: token,
    };
  }
}
