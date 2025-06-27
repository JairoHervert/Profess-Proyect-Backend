import { CreateClientDto } from '../dtos/client-register.dto';
import { CompleteDataClientDto } from '../dtos/client/client-completeData.dto';
import { ClientEntity } from '../entities/client-entity';

export interface ClientRepository {
  create(data: CreateClientDto): Promise<ClientEntity>;
  findByCorreo(correo: string): Promise<ClientEntity | null>;
  completeData(idCliente: number, data: CompleteDataClientDto): Promise<ClientEntity | null>;
  getDataById(id: number): Promise<ClientEntity | null>;
}
