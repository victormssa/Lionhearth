import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  MinLength,
} from 'class-validator';
import { Permission, Status } from '../schemas/user.schemas';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

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

  @IsNotEmpty()
  @IsEnum(Status, { message: 'Please enter correct status.' })
  readonly status: Status;
  
  @IsString()
  readonly bios: string;
  
  @IsNotEmpty()
  @IsString()
  readonly acceptedNews: string;

  @IsOptional()
  profileImage: Buffer | null;
}