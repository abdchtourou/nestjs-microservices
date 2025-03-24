import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto, CreateCategoryDto, LoginDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async SignUp(@Body() SignUpDto: SignUpDto) {
    try {
      return await this.userService.SignUp(SignUpDto);
    } catch (error) {
      throw new HttpException('Error creating user: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.userService.login(loginDto);
    } catch (error) {
      throw new HttpException('Login failed: ' + error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<SignUpDto>,
  ) {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Error updating user: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser({ id });
    } catch (error) {
      throw new HttpException('Error deleting user: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('categories')
  @UseGuards(AuthGuard('jwt'))
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.userService.createCategory(createCategoryDto);
    } catch (error) {
      throw new HttpException('Error creating category: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('categories/:id')
  @UseGuards(AuthGuard('jwt'))
  async getCategoryById(@Param('id') id: string) {
    try {
      return await this.userService.getCategoryById({ id });
    } catch (error) {
      throw new HttpException('Error fetching category: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('categories')
  @UseGuards(AuthGuard('jwt'))
  async getAllCategories() {
    try {
      return await this.userService.getAllCategories();
    } catch (error) {
      throw new HttpException('Error fetching categories: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/categories')
  @UseGuards(AuthGuard('jwt'))
  async getCategoriesByUserId(@Param('id') id: string) {
    try {
      return await this.userService.getCategoriesByUserId({ id });
    } catch (error) {
      throw new HttpException('Error fetching categories for user: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('categories/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateCategoryDto>,
  ) {
    try {
      return await this.userService.updateCategory(id, updateCategoryDto);
    } catch (error) {
      throw new HttpException('Error updating category: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('categories/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.userService.deleteCategory({ id });
    } catch (error) {
      throw new HttpException('Error deleting category: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('with-categories')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsersWithCategories() {
    try {
      return await this.userService.getAllUsersWithCategories();
    } catch (error) {
      throw new HttpException('Error fetching users with categories: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
