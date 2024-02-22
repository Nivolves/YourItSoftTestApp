import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail({}, { message: 'email:Must be an email' })
  email: string;
}
