import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

import { User } from '../entities/user.entity';

export class UserResponseDto {
  static transformEntityToDto({
    id,
    email,
    createdAt,
    updatedAt,
  }: User): UserResponseDto {
    return {
      id,
      email,
      createdAt,
      updatedAt,
    };
  }

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({ type: () => Date })
  createdAt: Date;

  @ApiProperty({ type: () => Date })
  updatedAt: Date;
}
