/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      // Conflict trả về StatusCode:409 - xung đột dữ liệu
      throw new ConflictException('Email đã được sử dụng');
    }
    /**
     * Thuật toán mã hoá bảng băm (1 chiều) + salt:10 (trộn thêm 10 ký tự ngẫu nhiên)
     */
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const { password, ...result } = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    // Loại password trước khi trả về client thông qua Api Response
    return result;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...result }) => result);
  }

  async getDetailById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`Không tìm thấy User với id: ${id}`);

    const { password, ...result } = user;
    return result;
  }
  // Dùng cho Login để Auth password
  async getDetailByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.getDetailById(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const { password, ...result } = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return result;
  }
  async removeUser(id: string) {
    await this.getDetailById(id);
    await this.prisma.user.delete({
      where: { id },
    });
    return { message: 'Xoá thành công' };
  }
  async toggleStatus(id: string) {
    const user = await this.getDetailById(id);
    const { password, ...result } = await this.prisma.user.update({
      where: { id },
      data: {
        isActive: !user.isActive,
      },
    });
    return result;
  }
}
