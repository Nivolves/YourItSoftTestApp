import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refreshToken: string;
}
