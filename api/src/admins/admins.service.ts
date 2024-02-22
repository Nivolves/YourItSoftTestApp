import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Admin } from './entities/admin.entity';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { AdminResponseDto } from './dto/admin-response.dto';

@Injectable()
export class AdminsService {
  private static readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin({ email, password }: SignUpDto): Promise<AdminResponseDto> {
    const admin = this.adminRepository.create({
      email,
      password: await bcrypt.hash(password, AdminsService.SALT_ROUNDS),
    });

    const savedAdmin = await this.adminRepository.save(admin);

    return AdminResponseDto.transformEntityToDto(savedAdmin);
  }

  findAdminById(id: number): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy({ id });
  }

  findByLogin(email: string): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy({ email });
  }
}
