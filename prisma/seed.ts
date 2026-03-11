/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client/extension';
import { Role } from 'generated/prisma/enums';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash password mẫu
  const password = await bcrypt.hash('123456', 10);

  // Tạo users mẫu cho mỗi role
  const users = [
    {
      email: 'student@example.com',
      password,
      fullName: 'Nguyễn Văn A - Sinh viên',
      role: Role.STUDENT,
      studentId: 'SV001',
      department: 'Công nghệ thông tin',
    },
    {
      email: 'instructor@example.com',
      password,
      fullName: 'TS. Lê Văn B - Giảng viên',
      role: Role.INSTRUCTOR,
      employeeId: 'GV001',
      department: 'Công nghệ thông tin',
    },
    {
      email: 'training@example.com',
      password,
      fullName: 'ThS. Phạm Thị C - Phòng Đào tạo',
      role: Role.ACADEMIC_AFFAIRS_OFFICE,
      employeeId: 'PDT001',
    },
    {
      email: 'it@example.com',
      password,
      fullName: 'KS. Trần Văn D - Phòng CNTT',
      role: Role.FACULTY_OFFICE,
      employeeId: 'CNTT001',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('✅ Seed data completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
