import { Request, Response } from 'express';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { PrismaPrestamistaRepository } from "../../models/prisma/prisma.prestamista.repository";
import { CreateClientService } from '../services/Client/create-client.service';

export class ClientController {
  private readonly createService = new CreateClientService(
    new PrismaClientRepository(),
    new PrismaPrestamistaRepository()
  );

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public registerClient = (req: Request, res: Response) => {
    this.createService
      .execute(req.body)
      .then(async (client) => res.json(client))
      .catch((error) => this.handleError(error, res));
  };
}