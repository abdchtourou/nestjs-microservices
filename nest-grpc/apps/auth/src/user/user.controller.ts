import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  UserServiceControllerMethods,
  Empty,
  FindOneUserDto,
  PaginationDto,
  Users,
  User,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  async createUser( createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers( _empty: Empty): Promise<Users> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOneUser( findOneUserDto: FindOneUserDto):Promise<User> {
    try {
      return await this.userService.findOne(findOneUserDto.id);
    } catch (error) {
      throw error;
    }
  }

  async updateUser( updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.update(updateUserDto.id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async removeOneUser( findOneUserDto: FindOneUserDto): Promise<User> {
    try {
      return await this.userService.remove(findOneUserDto.id);
    } catch (error) {
      throw error;
    }
  }

  queryUsers(paginationDtoStream : Observable<PaginationDto>) {
    try {
      return this.userService.queryUsers(paginationDtoStream);
    } catch (error) {
      throw error;
    }
  }
}
