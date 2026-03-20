import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { CoursesModule } from './modules/courses/courses.module';

import { AiModule } from './modules/ai/ai.module';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Module đọc biến môi trường .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoursesModule,
    AiModule,
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
