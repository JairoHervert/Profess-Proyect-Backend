import { Request, Response } from 'express';
import { PrismaServicioRepository } from '../../models/prisma/prisma.servicio.repository';
import { PrismaCategoryRepository } from '../../models/prisma/prisma.category.repository';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { CreateServicioService } from '../services/Servicio/create-servicio.service';
import { SearchServicioService } from '../services/Servicio/search-servicio.service';
import { CreateServicioDto } from '../../domain/dtos/servicio/create-servicio.dto';
import { SearchServicioDto } from '../../domain/dtos/servicio/search-servicio.dto';
import { GetServicioService } from '../services/Servicio/get-servicio.service';

export class ServicioController {
  private readonly createService = new CreateServicioService(
    new PrismaServicioRepository(),
    new PrismaCategoryRepository()
  );

  private readonly searchService = new SearchServicioService(
    new PrismaServicioRepository(),
    new PrismaCategoryRepository(),
    new PrismaPrestamistaRepository()
  );

  private readonly getServicioService = new GetServicioService(
    new PrismaServicioRepository(),
    new PrismaCategoryRepository(),
    new PrismaPrestamistaRepository()
  );

  private handleError = (error: unknown, res: Response) => {
    console.error('Error in ServicioController:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public createServicio = (req: Request, res: Response) => {
    const [error, serviceCreateDto] = CreateServicioDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.createService
      .execute(serviceCreateDto!)
      .then(servicio => res.status(201).json(servicio))
      .catch(error => this.handleError(error, res));
  };

  public searchServicio = (req: Request, res: Response) => {
    const query = {
      trabajo: typeof req.query.trabajo === 'string' ? req.query.trabajo.trim() : '',
      zona: typeof req.query.zona === 'string' ? req.query.zona.trim() : '',
    };

    const [error, searchDto] = SearchServicioDto.create(query);
    if (error) return res.status(400).json({ error });

    this.searchService
      .execute(searchDto!)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res));
  };

  public getService = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    this.getServicioService
      .execute(id)
      .then(result => res.status(200).json(result))
      .catch(error => this.handleError(error, res));
  };
}
