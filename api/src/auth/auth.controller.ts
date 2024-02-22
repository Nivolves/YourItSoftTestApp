import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AdminTokensResponseDto } from './dto/admin-tokens-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from 'src/auth/dto/login.dto';
import { GetAdmin } from 'src/shared/decorators/admin.decorator';
import { Admin } from 'src/admins/entities/admin.entity';
import { RefreshTokensDto } from 'src/admins/dto/refresh-tokens.dto';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AdminTokensResponseDto,
  })
  signUp(@Body() body: SignUpDto): Promise<AdminTokensResponseDto> {
    return this.authService.handleSignUp(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AdminTokensResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  login(@GetAdmin() admin: Admin): Promise<AdminTokensResponseDto> {
    return this.authService.handleLogin(admin);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  @ApiBody({ type: RefreshTokensDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AdminTokensResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  refreshTokens(@GetAdmin() { id }: Admin): Promise<AdminTokensResponseDto> {
    return this.authService.handleRefreshTokens(id);
  }
}
