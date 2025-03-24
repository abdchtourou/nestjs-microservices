import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  APP_SERVICE_NAME,
  AppClient,
  SignUpDto,
  UserList,
  User,
  UserWithCategoriesList,
  CreateCategoryDto,
  Category,
  CategoryList,
  UserIdDto,
  CategoryIdDto,
  Empty,
  Login,
  LoginDto,
} from '@app/common';
import { APP_SERVICE } from './constant';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: AppClient;

  constructor(@Inject(APP_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<AppClient>(APP_SERVICE_NAME);
  }

  async SignUp(SignUpDto: SignUpDto): Promise<Login> {
    try {
      return await firstValueFrom(this.userService.signUp(SignUpDto));
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async login(user: LoginDto): Promise<Login> {
    try {
      return await firstValueFrom(this.userService.loginUser(user));
    } catch (error) {
      throw new Error('Error logging in user');
    }
  }

  async getAllUsers(): Promise<UserList> {
    try {
      return await firstValueFrom(this.userService.getAllUsers({}));
    } catch (error) {
      throw new Error('Error fetching all users');
    }
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    try {
      return await firstValueFrom(
        this.userService.updateUser({ ...updateUserDto, id } as User),
      );
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  async deleteUser(userIdDto: UserIdDto): Promise<Empty> {
    try {
      return await firstValueFrom(this.userService.deleteUser(userIdDto));
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      return await firstValueFrom(
        this.userService.createCategory(createCategoryDto),
      );
    } catch (error) {
      throw new Error('Error creating category');
    }
  }

  async getCategoryById(categoryIdDto: CategoryIdDto): Promise<Category> {
    try {
      return await firstValueFrom(
        this.userService.getCategoryById(categoryIdDto),
      );
    } catch (error) {
      throw new Error('Error fetching category by ID');
    }
  }

  async getAllCategories(): Promise<CategoryList> {
    try {
      return await firstValueFrom(this.userService.getAllCategories({}));
    } catch (error) {
      throw new Error('Error fetching all categories');
    }
  }

  async getCategoriesByUserId(userIdDto: UserIdDto): Promise<CategoryList> {
    try {
      return await firstValueFrom(
        this.userService.getCategoriesByUserId(userIdDto),
      );
    } catch (error) {
      throw new Error('Error fetching categories by user ID');
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    try {
      return await firstValueFrom(
        this.userService.updateCategory({
          id,
          ...updateCategoryDto,
        } as Category),
      );
    } catch (error) {
      throw new Error('Error updating category');
    }
  }

  async deleteCategory(categoryIdDto: CategoryIdDto): Promise<Empty> {
    try {
      return await firstValueFrom(
        this.userService.deleteCategory(categoryIdDto),
      );
    } catch (error) {
      throw new Error('Error deleting category');
    }
  }

  async getAllUsersWithCategories(): Promise<UserWithCategoriesList> {
    try {
      return await firstValueFrom(
        this.userService.getAllUsersWithCategories({}),
      );
    } catch (error) {
      throw new Error('Error fetching users with categories');
    }
  }
}
