import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AppControllerMethods,
  Category,
  CategoryIdDto,
  CreateCategoryDto,
  SignUpDto,
  Empty,
  Login,
  LoginDto,
  User,
  UserIdDto,
  CategoryList,
} from '@app/common';

@Controller()
@AppControllerMethods()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async loginUser(request: LoginDto): Promise<Login> {
    try {
      return await this.userService.login(request);
    } catch (error) {
      throw new HttpException(
        `Login failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<Login> {
    try {
      return await this.userService.signUp(signUpDto);
    } catch (error) {
      throw new HttpException(
        `Signup failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(updateUser: User): Promise<User> {
    try {
      return await this.userService.updateUser(updateUser.id, updateUser);
    } catch (error) {
      throw new HttpException(
        `User update failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(userId: UserIdDto): Promise<Empty> {
    try {
      await this.userService.deleteUser(userId);
      return {};
    } catch (error) {
      throw new HttpException(
        `User deletion failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCategory(createCategory: CreateCategoryDto): Promise<Category> {
    try {
      return await this.userService.createCategory(createCategory);
    } catch (error) {
      throw new HttpException(
        `Category creation failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCategoryById(categoryIdDto: CategoryIdDto): Promise<Category> {
    try {
      return await this.userService.getCategoryById(categoryIdDto);
    } catch (error) {
      throw new HttpException(
        `Category not found: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllCategories(): Promise<CategoryList> {
    try {
      return await this.userService.getAllCategories();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve categories: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCategoriesByUserId(userIdDto: UserIdDto): Promise<CategoryList> {
    try {
      return await this.userService.getCategoriesByUserId(userIdDto);
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve categories for user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(category: Category): Promise<Category> {
    try {
      return await this.userService.updateCategory(category.id, category);
    } catch (error) {
      throw new HttpException(
        `Category update failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCategory(categoryId: CategoryIdDto): Promise<Empty> {
    try {
      await this.userService.deleteCategory(categoryId);
      return {};
    } catch (error) {
      throw new HttpException(
        `Category deletion failed: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsersWithCategories(): Promise<any> {
    try {
      return await this.userService.getAllUsersWithCategories();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve users with categories: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
