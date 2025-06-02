import { PrestamistaRepository } from "../../domain/repositories/prestamista.repository";
import { CreatePrestamistaDto } from "../../domain/dtos/prestamista.dto";
import bcrypt from "bcrypt";

export class CreatePrestamistaService {
  constructor(private readonly repo: PrestamistaRepository) {}

  async execute(data: CreatePrestamistaDto) {
    const exists = await this.repo.findByCorreo(data.correo);
    if (exists) {
      throw new Error("El correo ya está en uso");
    }

    const hashedPassword = await bcrypt.hash(data.contraseña, 10);

    return this.repo.create({
      ...data,
      contraseña: hashedPassword,
    });
  }
}
