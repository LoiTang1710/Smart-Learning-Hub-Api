/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(createEnrollmentDto: CreateEnrollmentDto) {
    const enroll = await this.prisma.enrollment.create({
      data: {
        ...createEnrollmentDto,
      },
    });
    return enroll;
  }
  async findUser(id: string) {
    return await this.prisma.enrollment.findUnique({
      where: { id },
    });
  }
  async findOne(id: string) {
    return await this.prisma.enrollment.findUnique({
      where: { id },
    });
  }
  async updateOne(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this.prisma.enrollment.update({
      where: { id },
      data: updateEnrollmentDto,
    });
  }
  async removeOne(id: string) {
    await this.prisma.enrollment.delete({
      where: { id },
    });
    return { message: `Xoá thành công id: ${id}` };
  }
}
