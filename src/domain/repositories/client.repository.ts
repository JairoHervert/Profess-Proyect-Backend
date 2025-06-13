import { CreateClientDto } from '../dtos/client-register.dto';
import { ClientEntity } from '../entities/client-entity';
import { PrestamistaEntity } from '../entities/prestamista.entity';

export interface ClientRepository {
  create(data: CreateClientDto): Promise<ClientEntity>;
  findByCorreoInClient(correo: string): Promise<ClientEntity | null>;
  findByCorreoInPrestamista(correo: string): Promise<PrestamistaEntity | null>;
}