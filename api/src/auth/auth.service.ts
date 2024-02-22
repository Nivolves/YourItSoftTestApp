import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { AdminsService } from 'src/admins/admins.service';
import { ITokens } from './interfaces/tokens.interface';
import { AdminTokensResponseDto } from './dto/admin-tokens-response.dto';
import { Admin } from '../admins/entities/admin.entity';
import { AdminResponseDto } from 'src/admins/dto/admin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleLogin(admin: Admin): Promise<AdminTokensResponseDto> {
    const adminData = AdminResponseDto.transformEntityToDto(admin);
    const { accessToken, refreshToken } = await this.createTokens(admin.id);
    return {
      admin: adminData,
      accessToken,
      refreshToken,
    };
  }

  async handleSignUp(data: SignUpDto): Promise<AdminTokensResponseDto> {
    const admin = await this.adminsService.createAdmin({
      ...data,
    });

    const { accessToken, refreshToken } = await this.createTokens(admin.id);

    return {
      admin,
      accessToken,
      refreshToken,
    };
  }

  async handleRefreshTokens(userId: number): Promise<AdminTokensResponseDto> {
    const existsUser = await this.adminsService.findAdminById(userId);

    return this.handleLogin(existsUser);
  }

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminsService.findByLogin(email);
    if (!admin) {
      throw new NotFoundException('User not found');
    }

    if (await bcrypt.compare(password, admin.password)) {
      return admin;
    }
  }

  private async createTokens(id: number): Promise<ITokens> {
    const payload = { id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
