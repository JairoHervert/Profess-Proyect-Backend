import { CreateServicioDto } from '../../../domain/dtos/servicio/create-servicio.dto';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';
// import { ServicioEntity } from "../../../domain/entities/servicio.entity";

export class CreateServicioService {
  constructor(private readonly servicioRepo: ServicioRepository) {}

  public async execute(data: CreateServicioDto) {
    const servicio = await this.servicioRepo.create(data);
    if (!servicio) {
      throw new Error('Error al crear el servicio');
    }
    return {
      id: servicio.id,
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      zona: servicio.zona,
      precio: servicio.precio,
      fechaInicio: servicio.fechaInicio,
      fechaFin: servicio.fechaFin || undefined,
      createdAt: servicio.createdAt,
      incluyeMateriales: servicio.incluyeMateriales || false,
      ofreceGarantia: servicio.ofreceGarantia || false,
      direccionLugar: servicio.direccionLugar || undefined,
      direccionReferencia: servicio.direccionReferencia || undefined,
      modalidadCobro: servicio.modalidadCobro,
      tipoJornada: servicio.tipoJornada || undefined,
      disponibilidad: servicio.disponibilidad || undefined,
      prestamistaId: servicio.prestamistaId,
      categoriaId: servicio.categoriaId,
    };
  }
}
