import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'No token provided in cookies' });

    try {
      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({ error: 'Invalid Token' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).auth = payload;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  // Middleware que valida token Y verifica rol
  static validateRole(expectedRole: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'No token provided in cookies' });

      try {
        interface JwtPayload {
          id: number;
          name: string;
          email: string;
          role: string;
        }
        const payload = (await JwtAdapter.validateToken(token)) as JwtPayload;
        if (!payload) return res.status(401).json({ error: 'Invalid Token' });

        if (payload.role !== expectedRole) {
          return res.status(403).json({ error: 'Access denied: insufficient role' });
        }

        console.log('Payload recibido:', payload);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (req as any).auth = payload;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid or expired token' });
      }
    };
  }
}
