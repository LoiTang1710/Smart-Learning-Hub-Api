import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// Source - https://stackoverflow.com/a/62141837
// Posted by Mark DeLoura
// Retrieved 2026-03-14, License - CC BY-SA 4.0
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma/client';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
    let MESSAGE: any = 'Internal server error';

    if (exception instanceof HttpException) {
      STATUS = exception.getStatus();
      MESSAGE = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          STATUS = HttpStatus.CONFLICT;
          MESSAGE = 'Lỗi duplicate: ' + String(exception?.meta?.target);
          break;
      }
    }

    response.status(STATUS).json({
      success: false,
      statusCode: STATUS,
      MESSAGE,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
