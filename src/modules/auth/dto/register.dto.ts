import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có độ dài ít nhất 6 ký tự' })
  password: string;
  @IsString()
  fullName: string;
}
