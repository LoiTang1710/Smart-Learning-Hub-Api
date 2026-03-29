/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * Xác thực request headers token mà client gửi lên server
 */
import {
  CanActivate,
  ExecutionContext,
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const accessTokenDecoded = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
        },
      );
      request.user = accessTokenDecoded;
      console.log(accessTokenDecoded);
    } catch (error) {
      /**
       * Case 1: accessToken hết hạn - FE cần biết để gọi API refreshToken
       */
      if (error?.message?.includes('jwt expired')) {
        throw new GoneException('Need to refreshToken');
      }
      /**
       * Case 2: TH còn lại accessToken không hợp lệ
       */
      throw new UnauthorizedException('Please login');
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
