/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * Service trung tâm quản lý kết nối tới database
 */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
// Class kế thừa từ Client và tồn tại 2 method
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to database');
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
