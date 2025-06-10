import { CreatePrestamistaDto } from "../dtos/prestamista-register.dto";
import { PrestamistaEntity } from "../entities/prestamista.entity";

export interface PrestamistaRepository {
  create(data: CreatePrestamistaDto): Promise<PrestamistaEntity>;
  findByCorreo(correo: string): Promise<PrestamistaEntity | null>;
  // sendEmailValidationLink(correo: string): Promise<void>;
}
