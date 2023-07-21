import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Permission } from '../schemas/user.schemas';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email.' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  readonly cellphone: string;

  @IsNotEmpty()
  @IsEnum(Permission, { message: 'Please enter correct permission.' })
  readonly permission: Permission;

  @IsOptional()
  profileImage: Buffer | null;
}
