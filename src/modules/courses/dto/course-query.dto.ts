import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CourseQueryDto {
  @IsOptional()
  @IsString()
  search?: string; //tim kiem theo ten khoa hoc

  @IsOptional()
  @Type(() => Number) //url luon la string, ep kieu ve number
  @IsInt()
  @Min(1)
  page?: number = 1; //mac dinh trang 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  limit?: number = 10; //mac dinh 10item moi page
}
