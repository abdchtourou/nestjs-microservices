import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid user data');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get('all')
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid update data');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Failed to remove user');
    }
  }

  @Post('email')
  async emailUsers() {
    try {
      return this.userService.emailUsers();
    } catch (error) {
      throw new InternalServerErrorException('Failed to send emails');
    }
  }
}
