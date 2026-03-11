/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      message: 'Tạo user thành công',
      data: await this.userService.createUser(createUserDto),
    };
  }

  @Get()
  async getAllUsers() {
    return {
      success: true,
      data: await this.userService.getAllUsers(),
    };
  }
  @Get(':id')
  async getDetailById(@Param('id') id: string) {
    return {
      success: true,
      data: await this.userService.getDetailById(id),
    };
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      success: true,
      data: await this.userService.updateUser(id, updateUserDto),
    };
  }
  @Delete(':id')
  async removeUser(@Param('id') id:string){
    return {
        success: true,
        data: await this.userService.removeUser(id)
    }
  }
  @Patch(':id')
  async toggleStatus(@Param('id') id:string){
    const user = await this.userService.toggleStatus(id)
    return {
        success: true,
        message: `User ${user.isActive ? 'được kích hoạt' : 'bị vô hiệu'} thành công`,
        data: user
    }
  }
}
