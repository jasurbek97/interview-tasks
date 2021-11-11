import { JWT_EXPIRE_IN_MINUTES, JWT_SECRET } from '../../environments';
import { JwtOptionsFactory } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions() {
    return {
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_EXPIRE_IN_MINUTES}m` },
    };
  }
}
