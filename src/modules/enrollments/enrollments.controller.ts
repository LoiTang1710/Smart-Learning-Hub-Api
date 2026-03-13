/* eslint-disable @typescript-eslint/no-unsafe-return */
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
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return await this.enrollmentService.createOne(createEnrollmentDto);
  }
  @Get('user/:userId')
  @HttpCode(HttpStatus.ACCEPTED)
  async findAll(@Param('userId') id: string) {
    return await this.enrollmentService.findUser(id);
  }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findOne(@Param('id') id: string) {
    return await this.enrollmentService.findOne(id);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return await this.enrollmentService.updateOne(id, updateEnrollmentDto);
  }
  @Delete(':id')
  async removeCourse(@Param('id') id: string) {
    return await this.enrollmentService.removeOne(id);
  }
}
