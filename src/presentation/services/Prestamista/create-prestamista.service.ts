import { PrestamistaRepository } from "../../../domain/repositories/prestamista.repository";
import { CreatePrestamistaDto } from "../../../domain/dtos/prestamista-register.dto";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

export class CreatePrestamistaService {
  constructor(private readonly repo: PrestamistaRepository) {}

  async execute(data: CreatePrestamistaDto) {
    const exists = await this.repo.findByCorreo(data.correo);
    if (exists) {
      throw new Error("El correo ya está en uso");
    }

    const hashedPassword = bcryptAdapter.hash(data.contraseña);

    const prestamista = await this.repo.create({
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
