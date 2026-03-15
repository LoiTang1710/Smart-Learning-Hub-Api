import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNumber()
  progress: number;

  @IsDateString()
  lastAccessIn: Date;
}
