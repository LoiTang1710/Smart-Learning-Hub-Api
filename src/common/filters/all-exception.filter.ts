// common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: any = {
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Xử lý HttpException (do bạn throw từ service)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      // Nếu res là object, merge vào responseBody
      if (typeof res === 'object') {
        responseBody = { ...responseBody, ...res };
      } else if (typeof res === 'string') {
        (responseBody as { message?: string }).message = res;
      }
      responseBody.statusCode = status;
    }
    // Xử lý Prisma errors (nếu chưa được bắt ở service)
    else if (exception instanceof PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      responseBody.message = exception.message.replace(/\n/g, ' '); // dọn dẹp
      responseBody.statusCode = status;
    }
    // Các lỗi khác
    else if (exception instanceof Error) {
      responseBody.message = exception.message;
      responseBody.statusCode = status;
    } else {
      responseBody.message = 'Internal server error';
      responseBody.statusCode = status;
    }

    // Log lỗi
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(responseBody)}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(responseBody);
  }
}
