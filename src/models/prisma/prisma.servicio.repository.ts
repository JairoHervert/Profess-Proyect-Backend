import { PrismaClient } from "@prisma/client";
import { ServicioRepository } from "../../domain/repositories/servicio.repository";
import { CreateServicioDto } from "../../domain/dtos/servicio/create-servicio.dto";
import { ServicioEntity } from "../../domain/entities/servicio.entity";

const prisma = new PrismaClient();

export class PrismaServicioRepository implements ServicioRepository {
  async create(CreateServicioDto: CreateServicioDto): Promise<ServicioEntity> {
    const servicio = await prisma.servicio.create({
      data: {
        titulo: CreateServicioDto.titulo,
        descripcion: CreateServicioDto.descripcion,
        zona: CreateServicioDto.zona,
        precio: CreateServicioDto.precio,
        fechaInicio: CreateServicioDto.fechaInicio,
        fechaFin: CreateServicioDto.fechaFin || undefined,
        incluyeMateriales: CreateServicioDto.incluyeMateriales || false,
        ofreceGarantia: CreateServicioDto.ofreceGarantia || false,
        direccionLugar: CreateServicioDto.direccionLugar || undefined,
        direccionReferencia: CreateServicioDto.direccionReferencia || undefined,
        modalidadCobro: CreateServicioDto.modalidadCobro,
        tipoJornada: CreateServicioDto.tipoJornada || undefined,
        disponibilidad: CreateServicioDto.disponibilidad || undefined,
        prestamista_idPrestamista: CreateServicioDto.prestamistaId,
        categoria_idCategoria: CreateServicioDto.categoriaId,
      },
    });
    // Convertir el resultado a ServicioEntity si es necesario
    const servicioEntity: ServicioEntity = {
      id: servicio.idServicio,
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
      prestamistaId: servicio.prestamista_idPrestamista,
      categoriaId: servicio.categoria_idCategoria,
    };
    return servicioEntity;
  }
}
