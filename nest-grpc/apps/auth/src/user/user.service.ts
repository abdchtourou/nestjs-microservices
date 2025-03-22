import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
} from '@app/common';
import { Injectable, NotFoundException, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: `abd${i}`, password: randomUUID(), age: 10 });
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = {
        ...createUserDto,
        id: randomUUID(),
      };
      this.users.push(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<Users> {
    return { users: this.users };
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
  
    const updatedUser = {
      ...this.users[userIndex], 
      ...updateUserDto, 
    };
  
    this.users[userIndex] = updatedUser; 
  

    return updatedUser;
  }
  async remove(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const [removedUser] = this.users.splice(userIndex, 1);
    return removedUser;
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => subject.complete();

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
