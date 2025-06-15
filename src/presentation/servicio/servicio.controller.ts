import { Request, Response } from "express";
import { PrismaServicioRepository } from "../../models/prisma/prisma.servicio.repository";
import { CreateServicioService } from "../services/Servicio/create-servicio.service";
import { CreateServicioDto } from "../../domain/dtos/servicio/create-servicio.dto";

export class ServicioController {
  private readonly createService = new CreateServicioService(
    new PrismaServicioRepository(),
  );

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public createServicio = (req: Request, res: Response) => {
    const [error, healthCreateDto] = CreateServicioDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.createService
      .execute(healthCreateDto!)
      .then((servicio) => res.status(201).json(servicio))
      .catch((error) => this.handleError(error, res));
  };
}
