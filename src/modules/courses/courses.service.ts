import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  //1. Post /courses - tạo khoá học
  async createCourse(data: CreateCourseDto) {
    return this.prisma.course.create({ data });
  }

  // 2. GET /courses - lấy DS khóa học (Có phân trang & filter)
  async findAllCourse(query: CourseQueryDto) {
    const { search, page, limit } = query;
    const skip = (page - 1) * limit;

    const whereCondition = search
      ? { title: { contain: search, mode: 'insensitive' as const } }
      : {};
    const [course, total] = await Promise.all([
      this.prisma.course.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where: whereCondition }),
    ]);
    return {
      data: course,
      meta: { total, page, limit, totalPage: Math.ceil(total / limit) },
    };
  }
  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Không tìm thấy khoá học');
    return course;
  }
  async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
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
// --- CÁC ENDPOINT QUAN HỆ ---
