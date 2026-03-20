import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }
  // GET /courses (vd: /courses?page=1&limit=5&search=node)
  @Get()
  findAll(@Query() query: CourseQueryDto) {
    return this.courseService.findAllCourse(query);
  }
  @Get(':id')
  findone(@Param('id') id: string) {
    return this.courseService.findCourseById(id);
  }
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }
  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.removeOne(id);
  }
  // ==========================================
  // CÁC ENDPOINT QUAN HỆ (Nested Routes)
  // ==========================================
  @Get(':id/lessons')
  getLessons(@Param('id') id: string) {
    return this.courseService.getCourseLesson(id);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.courseService.getCourseReview(id);
  }

  @Post(':id/enroll')
  enroll(@Param('id') courseId: string, @Body('userId') userId: string) {
    return this.courseService.enrollStudent(courseId, userId);
  }
}
