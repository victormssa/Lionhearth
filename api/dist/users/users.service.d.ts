import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schemas';
import { Query } from 'express-serve-static-core';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: mongoose.Model<User>, jwtService: JwtService);
    findAll(query: Query): Promise<User[]>;
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        id: string;
    }>;
    findById(id: Types.ObjectId): Promise<User>;
    updateById(id: mongoose.Types.ObjectId, user: User): Promise<User | null>;
    deleteById(id: mongoose.Types.ObjectId): Promise<User | null>;
}
