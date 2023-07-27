import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { User } from './schemas/user.schemas';
import { SignUpDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('/users')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    try {
      return this.authService.findAll(query);
    } catch (error) {
      console.error('Error while fetching all users:', error);
      throw new InternalServerErrorException('An error occurred while fetching all users.');
    }
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('profileImage'))
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    try {
      const { username, fullname, email, password, birthDate, cellphone, status, bios, acceptedNews, permission, profileImage } =
        signUpDto;

      return this.authService.signUp({
        username,
        fullname,
        email,
        password,
        birthDate,
        cellphone,
        status,
        bios,
        acceptedNews,
        permission,
        profileImage,
      });
    } catch (error) {
      console.error('Error while signing up user:', error);
      throw new InternalServerErrorException('An error occurred while signing up the user.');
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      console.error('Error while logging in:', error);
      throw new InternalServerErrorException('An error occurred while logging in.');
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id: mongoose.Types.ObjectId) {
    try {
      const user = await this.authService.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error while fetching user by ID:', error);
      throw new InternalServerErrorException('An error occurred while fetching user by ID.');
    }
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    try {
      const updatedUser = await this.authService.updateById(id, user);
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.error('Error while updating user:', error);
      throw new InternalServerErrorException('An error occurred while updating the user.');
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: mongoose.Types.ObjectId) {
    try {
      const user = await this.authService.deleteById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error while deleting user:', error);
      throw new InternalServerErrorException('An error occurred while deleting the user.');
    }
  }
  
  @Post(':id/picture')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() imageFile: Express.Multer.File, @Param('id') userId: string): Promise<string> {
    return this.authService.uploadImage(imageFile, userId);
  }
}