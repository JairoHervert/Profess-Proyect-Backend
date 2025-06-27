import { Request, Response } from 'express';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { CreatePrestamistaService } from '../services/Prestamista/create-prestamista.service';
import { RegisterPrestamistaGoogleService } from '../services/Prestamista/register-prestamista-google.service';
import { CompleteDataDto } from '../../domain/dtos/prestamista/prestamista-completeData.dto';
import { CompleteDataService } from '../services/Prestamista/completeData-prestamista.service';
import { GetDataService } from '../services/Prestamista/get-data-prestamista.service';

export class PrestamistaAuthController {
  private readonly registerService = new CreatePrestamistaService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );

  private readonly registerGoogleService = new RegisterPrestamistaGoogleService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );

  private readonly completeDataService = new CompleteDataService(new PrismaPrestamistaRepository());
  private readonly getDataService = new GetDataService(new PrismaPrestamistaRepository());

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public registerPrestamista = (req: Request, res: Response) => {
    this.registerService
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

  public registerGooglePrestamista = async (req: Request, res: Response) => {
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
    const [error, completeDataDto] = CompleteDataDto.create(req.body);

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
