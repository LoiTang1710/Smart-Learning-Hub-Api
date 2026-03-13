import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EnrollmentModule } from './modules/enrollments/enrollments.module';
import { AiModule } from './modules/ai/ai.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    // Module đọc biến môi trường .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CoursesModule,
    EnrollmentModule,
    AiModule,
    AdminModule,
    PrismaModule,
  ],
  controllers: [],
})
export class AppModule {}
