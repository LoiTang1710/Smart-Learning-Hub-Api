/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * Service trung tâm quản lý kết nối tới database
 */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
// Class kế thừa từ Client và tồn tại 2 method
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
    constructor(){
        const pool = new PrismaPg({connectionString:process.env.DATABASE_URL})
        super({adapter:pool})
    } 
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to database');
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
