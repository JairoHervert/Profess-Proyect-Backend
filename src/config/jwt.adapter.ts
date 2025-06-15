import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED: string = envs.JWT_SEED as string;

export class JwtAdapter {
  static async generateToken(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
    duration: jwt.SignOptions['expiresIn'] = '2h'
  ) {
    return new Promise(resolve => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    return new Promise(resolve => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  }
}
