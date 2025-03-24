

import {
  Category,
  CategoryIdDto,
  CategoryList,
  CreateCategoryDto,
  SignUpDto,
  Login,
  LoginDto,
  User,
  UserIdDto,
  UserList,
  UserWithCategoriesList,
} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users: User[] = [];
  private categories: Category[] = [];

  constructor(private readonly jwtService: JwtService) {}




  async login(user: LoginDto): Promise<Login> {
    const existingUser = this.users.find((u) => u.email === user.email);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const payload = { username: user.email, sub: existingUser.id };

    const token = this.jwtService.sign(payload);

    return {
      user: existingUser,
      token: token,
    };
  }
  


  async signUp(SignUpDto: SignUpDto): Promise<Login> {
    const newUser: User = {
      ...SignUpDto,
      id: randomUUID(),
    };
    this.users.push(newUser);

    const payload = { username: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return {
      user: newUser,
      token: token,
    };
  }

  getUserById(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<UserList> {
    return { users: this.users };
  }

  updateUser(id: string, updateUserDto: Partial<SignUpDto>): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(userId: UserIdDto): void {
    const userIndex = this.users.findIndex((u) => u.id === userId.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Category {
    const userExists = this.users.some(
      (user) => user.id === createCategoryDto.userId,
    );
    if (!userExists) {
      throw new Error('User not found');
    }
    const newCategory: Category = { id: randomUUID(), ...createCategoryDto };
    this.categories.push(newCategory);
    return newCategory;
  }

  getCategoryById(categoryIdDto: CategoryIdDto): Category {
    const category = this.categories.find((c) => c.id === categoryIdDto.id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  getAllCategories(): CategoryList {
    return { categories: this.categories };
  }

  getCategoriesByUserId(userId: UserIdDto): CategoryList {
    const userCategories = this.categories.filter(
      (category) => category.userId === userId.id,
    );
    return { categories: userCategories };
  }

  updateCategory(
    id: string,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Category {
    const categoryIndex = this.categories.findIndex((c) => c.id === id);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    const updatedCategory = {
      ...this.categories[categoryIndex],
      ...updateCategoryDto,
    };
    this.categories[categoryIndex] = updatedCategory;
    return updatedCategory;
  }

  deleteCategory(categoryId: CategoryIdDto): void {
    const categoryIndex = this.categories.findIndex(
      (c) => c.id === categoryId.id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    this.categories.splice(categoryIndex, 1);
  }

  getAllUsersWithCategories(): UserWithCategoriesList {
    return {
      users: this.users.map((user) => ({
        user,
        categories: this.categories.filter(
          (category) => category.userId === user.id,
        ),
      })),
    };
  }
}
