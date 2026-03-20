import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findByStudentId(studentId: string) {
    return this.prisma.user.findUnique({ where: { studentId } });
  }
  async findbyEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async create(data: any) {
    return await this.prisma.user.create(data);
  }
}
