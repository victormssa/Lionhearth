import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, IsDate, IsEnum, IsBoolean } from 'class-validator';

export enum Permission {
  ADMIN = 'Admin',
  PLAYER = 'Player',
}

export enum Status {
  ONLINE = 'Online',
  OCUPADO = 'Ocupado',
  NÃO_PERTURBAR = 'Não perturbar',
  OFFLINE = 'Offline',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: [true, 'Duplicated username entered'] })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Prop({ unique: [true, 'Duplicated email entered'] })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  cellphone: string;

  @Prop({ enum: Permission, default: Permission.PLAYER })
  @IsNotEmpty()
  @IsEnum(Permission)
  permission: Permission;

  @Prop({ enum: Status, default: Status.OFFLINE })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @Prop()
  @IsString()
  bios: string;

  @Prop({ default: false })
  @IsString()
  acceptedNews: string;

  @Prop()
  profileImage: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);
