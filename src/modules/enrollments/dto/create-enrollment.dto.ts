import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNumber()
  progress: number;

  @IsDateString()
  lastAccessIn: Date;
}
