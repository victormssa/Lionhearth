import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          fullname: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const {
      username,
      fullname,
      email,
      password,
      cellphone,
      permission,
      profileImage,
    } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const status = "Offline"

    const user = await this.userModel.create({
      username,
      fullname,
      email,
      password: hashedPassword,
      cellphone,
      permission,
      profileImage,
      status: status
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; id: string }> {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const id = user._id.toString();
    const token = this.jwtService.sign({ id: user._id });

    return { token, id };
  }

  async findById(id: Types.ObjectId): Promise<User> {
    const isValidId = Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID.');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    user: User,
  ): Promise<User | null> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<User | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      return null;
    }
  }
}
