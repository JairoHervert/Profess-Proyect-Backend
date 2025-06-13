import { CreatePrestamistaDto } from "../dtos/prestamista-register.dto";
import { PrestamistaEntity } from "../entities/prestamista.entity";
import { ClientEntity } from '../../domain/entities/client-entity';

export interface PrestamistaRepository {
  create(data: CreatePrestamistaDto): Promise<PrestamistaEntity>;
  findByCorreoInPrestamista(correo: string): Promise<PrestamistaEntity | null>;
  findByCorreoInClient(correo: string): Promise<ClientEntity | null>;
}
