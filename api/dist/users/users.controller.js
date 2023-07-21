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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("./users.service");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const express_serve_static_core_1 = require("express-serve-static-core");
const mongoose_1 = require("mongoose");
const login_dto_1 = require("./dto/login.dto");
let UsersController = exports.UsersController = class UsersController {
    constructor(authService) {
        this.authService = authService;
    }
    async getAllUsers(query) {
        return this.authService.findAll(query);
    }
    async signUp(file, signUpDto) {
        const { username, fullname, email, password, cellphone, permission } = signUpDto;
        const profileImage = file ? file.buffer : null;
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
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async getUser(id) {
        const user = await this.authService.findById(id);
        return user;
    }
    async updateUser(id, user) {
        const updatedUser = await this.authService.updateById(id, user);
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.authService.deleteById(id);
        return user;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_serve_static_core_1.Query !== "undefined" && express_serve_static_core_1.Query) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profileImage')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object, typeof (_e = typeof signup_user_dto_1.SignUpDto !== "undefined" && signup_user_dto_1.SignUpDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Types.ObjectId, typeof (_g = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
//# sourceMappingURL=users.controller.js.map