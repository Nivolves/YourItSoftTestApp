import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsString()
  @IsEmail({}, { message: 'email:Must be an email' })
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    {
      message:
        'password:Password must has at least 6 characters one uppercase and one number',
    },
  )
  password: string;
}
