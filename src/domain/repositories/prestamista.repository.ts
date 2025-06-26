import { CreatePrestamistaDto } from "../dtos/prestamista-register.dto";
import { CompleteDataDto } from "../dtos/prestamista/prestamista-completeData.dto";
import { PrestamistaEntity } from "../entities/prestamista.entity";

export interface PrestamistaRepository {
  create(data: CreatePrestamistaDto): Promise<PrestamistaEntity>;
  findByCorreo(correo: string): Promise<PrestamistaEntity | null>;
  completeData(idPrestamista: number, data: CompleteDataDto): Promise<PrestamistaEntity | null>;
}
