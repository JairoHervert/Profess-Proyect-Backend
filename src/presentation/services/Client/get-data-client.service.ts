import { ClientRepository } from '../../../domain/repositories/client.repository';

export class GetDataClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(id: number) {
    const client = await this.clientRepo.getDataById(id);
    if (!client) {
      throw new Error('Cliente no encontrado');
    }
    return client;
  }
}
