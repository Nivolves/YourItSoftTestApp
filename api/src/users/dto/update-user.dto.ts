import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'email:Must be an email' })
  @IsOptional()
  email: string;
}
