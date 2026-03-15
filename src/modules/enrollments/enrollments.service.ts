/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      return await this.prisma.enrollment.create({
        data: {
          ...createEnrollmentDto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        const { userId, courseId } = createEnrollmentDto;
        throw new ConflictException({
          message: 'Người dùng đã đăng ký khóa học này',
          conflictData: { userId, courseId },
        });
      }
      throw error;
    }
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
