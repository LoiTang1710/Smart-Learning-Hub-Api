import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.findUnique({
      where: { email: createUserDto.email },
    });
    if(existingUser){
        // Conflict trả về StatusCode:409 - xung đột dữ liệu
        throw new ConflictException('Email đã được sử dụng')
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password,10)
  }
}
