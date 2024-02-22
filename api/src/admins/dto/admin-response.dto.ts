import { ApiProperty } from '@nestjs/swagger';

import { Admin } from '../entities/admin.entity';

export class AdminResponseDto {
  static transformEntityToDto({ id, email }: Admin): AdminResponseDto {
    return {
      id,
      email,
    };
  }

  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;
}
