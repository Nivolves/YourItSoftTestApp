import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.handleFindAllUsers();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  createUser(@Body() body: CreateUserDto): Promise<UserResponseDto[]> {
    return this.usersService.handleCreateUser(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
  })
  updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto[]> {
    return this.usersService.handleUpdateUser(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  deleteUser(@Param('id') id: number): Promise<UserResponseDto[]> {
    return this.usersService.handleDeleteUser(id);
  }
}
