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
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  async getDetailById(@Param('id') id: string) {
    return await this.userService.getDetailById(id);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }
  @Patch(':id')
  async toggleStatus(@Param('id') id: string) {
    return await this.userService.toggleStatus(id);
  }
}
