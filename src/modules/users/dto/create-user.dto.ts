/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import type { Role } from 'generated/prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  fullName: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  //format sdt chuẩn vn: đầu 0 || +84, số tiếp theo từ 3-9 (01-số quốc tế, 02-sdt bàn), 8 số tiếp theo từ 0-9
  @Matches(/^(0|\+84)[3-9][0-9]{8}$/, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  faculty?: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;
}
