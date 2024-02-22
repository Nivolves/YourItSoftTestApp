import { ApiProperty } from '@nestjs/swagger';
import { AdminResponseDto } from '../../admins/dto/admin-response.dto';

export class AdminTokensResponseDto {
  @ApiProperty({ type: () => AdminResponseDto })
  admin: AdminResponseDto;

  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: String })
  refreshToken: string;
}
