import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(AdminsService)
    private adminsService: AdminsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: ITokenPayload): Promise<User> {
    const { id } = payload;
    const admin = await this.adminsService.findAdminById(id);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
