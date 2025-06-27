import { Request, Response } from 'express';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { CreateClientService } from '../services/Client/create-client.service';
import { RegisterGoogleClientService } from '../services/Client/register-cliente-google.service';
import { CompleteDataClientDto } from '../../domain/dtos/client/client-completeData.dto';
import { CompleteDataClientService } from '../services/Client/completeData-client.service';
import { GetDataClientService } from '../services/Client/get-data-client.service';

export class ClientController {
  private readonly createService = new CreateClientService(
    new PrismaClientRepository(),
    new PrismaPrestamistaRepository()
  );

  private readonly registerGoogleService = new RegisterGoogleClientService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );

  private readonly completeDataService = new CompleteDataClientService(
    new PrismaClientRepository()
  );

  private readonly getDataService = new GetDataClientService(new PrismaClientRepository());

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public registerClient = (req: Request, res: Response) => {
    this.createService
      .execute(req.body)
      .then(async ({ token, ...user }) => {
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 día
          })
          .json(user);
      })
      .catch(error => this.handleError(error, res));
  };

  public registerGoogleClient = async (req: Request, res: Response) => {
    this.registerGoogleService
      .execute(req.body)
      .then(async ({ token, ...user }) => {
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 día
          })
          .json(user);
      })
      .catch(error => this.handleError(error, res));
  };

  public completeData = (req: Request, res: Response) => {
    const [error, completeDataDto] = CompleteDataClientDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.completeDataService
      .execute(completeDataDto!)
      .then(data => res.status(201).json(data))
      .catch(error => this.handleError(error, res));
  };

  public getData = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const data = await this.getDataService.execute(id);
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
