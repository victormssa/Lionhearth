import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Permission } from '../schemas/user.schemas';
import { Status } from '../schemas/user.schemas';

export class UpdateUserDto {
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
  
  @IsNotEmpty()
  @IsString()
  readonly birthDate: string;

  @IsString()
  readonly cellphone: string;

  @IsNotEmpty()
  @IsEnum(Permission, { message: 'Please enter correct permission.' })
  readonly permission: Permission;

  @IsEnum(Status, { message: 'Please enter correct status.' })
  readonly status: Status;
  
  @IsString()
  readonly bios: string;
  
  @IsNotEmpty()
  @IsString()
  readonly acceptedNews: string;

  @IsOptional()
  profileImage: string;
}
