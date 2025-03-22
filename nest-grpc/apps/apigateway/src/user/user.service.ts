import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  UpdateUserDto,
  CreateUserDto,
  UserServiceClient,
  USER_SERVICE_NAME,
  PaginationDto,
  Users,
} from '@app/common';
import { AUTH_SERVICE } from './constant';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  async findAll() {
    try {
      return this.userService.findAllUsers({});
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      return this.userService.findOneUser({ id });
    } catch (error) {
      throw new Error('Failed to retrieve user: ' + error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { id: dtoId, ...updateData } = updateUserDto;
      return this.userService.updateUser({  ...updateUserDto });
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      return this.userService.removeOneUser({ id });
    } catch (error) {
      throw new Error('Failed to remove user: ' + error.message);
    }
  }

  emailUsers() {
    const users = new ReplaySubject<PaginationDto>();
    users.next({ page: 0, skip: 32 });
    users.next({ page: 1, skip: 32 });
    users.next({ page: 2, skip: 32 });
    users.next({ page: 3, skip: 32 });
    users.complete();
    let chunkNum = 1;
    this.userService.queryUsers(users).subscribe((user) => {
      console.log(chunkNum,user)
      chunkNum += 1;
    });
  }
}
