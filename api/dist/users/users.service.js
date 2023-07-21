"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const user_schemas_1 = require("./schemas/user.schemas");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = exports.UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll(query) {
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
    async signUp(signUpDto) {
        const { username, fullname, email, password, cellphone, permission, profileImage, } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            username,
            fullname,
            email,
            password: hashedPassword,
            cellphone,
            permission,
            profileImage,
        });
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const id = user._id.toString();
        const token = this.jwtService.sign({ id: user._id });
        return { token, id };
    }
    async findById(id) {
        const isValidId = mongoose_1.Types.ObjectId.isValid(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter a valid ID.');
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        return user;
    }
    async updateById(id, user) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
                new: true,
                runValidators: true,
            });
            return updatedUser;
        }
        catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }
    async deleteById(id) {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            return deletedUser;
        }
        catch (error) {
            console.error('Error deleting user:', error);
            return null;
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose.Model, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], UsersService);
//# sourceMappingURL=users.service.js.map