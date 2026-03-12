import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Level } from 'generated/prisma/enums';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsEnum(Level)
  level: Level;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  totalStudent?: number;

  @IsString()
  instructorId: string;
}
