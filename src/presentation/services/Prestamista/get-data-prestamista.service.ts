import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';

export class GetDataService {
  constructor(private readonly prestamistaRepo: PrestamistaRepository) {}

  async execute(id: number) {
    const prestamista = await this.prestamistaRepo.getDataById(id);
    if (!prestamista) {
      throw new Error('Prestamista no encontrado');
    }
    return prestamista;
  }
}
