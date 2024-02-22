import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AdminsService } from '../admins/admins.service';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private config: ConfigService,
    @Inject(AdminsService)
    private adminsService: AdminsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(_: Request, payload: ITokenPayload) {
    const { id } = payload;
    const admin = await this.adminsService.findAdminById(id);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
