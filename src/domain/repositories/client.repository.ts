import { CreateClientDto } from '../dtos/client-register.dto';
import { ClientEntity } from '../entities/client-entity';

export interface ClientRepository {
  create(data: CreateClientDto): Promise<ClientEntity>;
  findByCorreo(correo: string): Promise<ClientEntity | null>;
}