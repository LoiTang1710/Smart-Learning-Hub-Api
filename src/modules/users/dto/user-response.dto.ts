export class UserResposneDto {
  id: string;
  email: string;
  password: string;
  fullname: string;
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
  createAt: Date;
  updatedAt: Date;
}
