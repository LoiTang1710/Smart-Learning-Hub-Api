export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: string;
  faculty?: string;
  studentId?: string;
  employeeId?: string;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
