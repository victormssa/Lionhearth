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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { User } from './schemas/user.schemas';
import { SignUpDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.authService.findAll(query);
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('profileImage'))
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    const { username, fullname, email, password, cellphone, permission } =
      signUpDto;

    const profileImage = file ? file.buffer : null; // Access the buffer of the uploaded file, or set it to null if no file was uploaded

    return this.authService.signUp({
      username,
      fullname,
      email,
      password,
      cellphone,
      permission,
      profileImage,
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/:id')
  async getUser(@Param('id') id: mongoose.Types.ObjectId) {
    const user = await this.authService.findById(id);
    return user;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.authService.updateById(id, user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: mongoose.Types.ObjectId) {
    const user = await this.authService.deleteById(id);
    return user;
  }
}