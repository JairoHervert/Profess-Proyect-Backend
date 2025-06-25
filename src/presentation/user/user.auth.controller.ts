import { Request, Response } from 'express';
import { PrismaPrestamistaRepository } from '../../models/prisma/prisma.prestamista.repository';
import { PrismaClientRepository } from '../../models/prisma/prisma.client.repository';
import { LoginService } from '../services/User/login.service';
import { LoginGoogleService } from '../services/User/login-google.service';

export class UserAuthController {
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public login = (req: Request, res: Response) => {
    const { correo, contraseña } = req.body;
    const loginService = new LoginService(
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

  public loginGoogle = async (req: Request, res: Response) => {
    const loginService = new LoginGoogleService(
      new PrismaPrestamistaRepository(),
      new PrismaClientRepository()
    );

    loginService
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
}
