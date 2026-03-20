/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UsersService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  // API LOGIN
  async login(loginDto: LoginDto) {
    const user = await this.user.findbyEmail(loginDto.email);
    if (!user || !bcrypt.compareSync(loginDto.password, user.password))
      throw new UnauthorizedException(`MSSV hoặc mật khẩu không đúng`);
    const userInfo = { id: user.id, roleId: user.roleId };
    const accessToken = this.jwt.sign(userInfo, {
      secret: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(userInfo, {
      secret: process.env.REFRESH_TOKEN_SERCRET_SIGNATURE,
      expiresIn: '7d',
    });
    if (!accessToken || !refreshToken)
      throw new Error('Khởi tạo accessToken và refreshToken thất bại');
    return { accessToken, refreshToken };
  }
  // API REGISTER
  async register(registerDto: RegisterDto) {
    const existingUser = await this.user.findbyEmail(registerDto.email);
    if (existingUser)
      throw new ConflictException(
        `${registerDto.email} này đã đăng ký tài khoản`,
      );
    const studentRole = await this.prisma.role.findUnique({
      where: { role_name: 'STUDENT' },
    });

    // Báo lỗi rõ ràng nếu bạn quên làm Bước 1
    if (!studentRole) {
      throw new Error('Bạn chưa tạo role_name là STUDENT trong bảng Role kìa!');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        fullName: registerDto.fullName,
        roleId: studentRole.id,
      },
    });
    const { password, ...res } = newUser;
    return { message: 'Đăng ký thành công', user: newUser };
  }
}
