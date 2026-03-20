import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  @MinLength(6, { message: 'Mật khẩu phải có độ dài ít nhất 6 ký tự' })
  @IsNotEmpty()
  password: string;
}
