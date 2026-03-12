import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { AiModule } from './modules/ai/ai.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

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
  ],
  controllers: [],
  providers: [PrismaService],
  // exports: [PrismaService],
})
export class AppModule {}
