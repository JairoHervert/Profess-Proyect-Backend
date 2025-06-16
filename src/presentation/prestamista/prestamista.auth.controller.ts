import { Request, Response } from 'express';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { CreatePrestamistaService } from '../services/Prestamista/create-prestamista.service';
import { LoginPrestamistaService } from '../services/Prestamista/login-prestamista.service';

export class PrestamistaAuthController {
  private readonly registerService = new CreatePrestamistaService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );

  private readonly registerGoogleService = new CreatePrestamistaService(
    new PrismaPrestamistaRepository(),
    new PrismaClientRepository()
  );

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public registerPrestamista = (req: Request, res: Response) => {
    // MAS O MENOS ASI TIENE QUE QUEDAR, CAMBIAR TAMBIEN EN EL DE LOGIN
    // const [error, accountRegisterDto] = AccountRegisterDto.create(req.body);
    // if (error) return res.status(400).json({ error });

    this.registerService
      .execute(req.body)
      // .then(async prestamista => res.json(prestamista))
      .then(async ({ token, ...user }) => {
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 día
          })
          .json(user);
        // .json({ token, user });
      })
      .catch(error => this.handleError(error, res));
  };

  public registerGooglePrestamista = async (req: Request, res: Response) => {
    this.registerGoogleService
      .execute(req.body)
      .then(async prestamista => res.json(prestamista))
      .catch(error => this.handleError(error, res));
  };

  public loginPrestamista = (req: Request, res: Response) => {
    const { correo, contraseña } = req.body;
    const loginService = new LoginPrestamistaService(
      new PrismaPrestamistaRepository(),
      new PrismaClientRepository()
    );

    loginService
      .execute({ correo, contraseña })
      // .then(async prestamista => res.json(prestamista))
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
}
