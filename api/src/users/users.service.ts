import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handleFindAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });

    return users.map((user) => UserResponseDto.transformEntityToDto(user));
  }

  async handleCreateUser(data: CreateUserDto): Promise<UserResponseDto[]> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    const users = await this.handleFindAllUsers();

    return users;
  }

  async handleUpdateUser(
    id: number,
    body: UpdateUserDto,
  ): Promise<UserResponseDto[]> {
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.merge(user, { ...body });
    await this.userRepository.save(user);
    return this.handleFindAllUsers();
  }

  async handleDeleteUser(id: number): Promise<UserResponseDto[]> {
    await this.userRepository.delete(id);

    return this.handleFindAllUsers();
  }
}
