/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: {
        ...createCourseDto,
      },
    });
  }

  async findAll() {
    return (await this.prisma.course.findMany()).map(({ ...result }) => result);
  }
  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }
  async updateOne(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }
  async removeOne(id: string) {
    await this.prisma.course.delete({
      where: { id },
    });
    return { message: `Xoá thành công id: ${id}` };
  }
}
