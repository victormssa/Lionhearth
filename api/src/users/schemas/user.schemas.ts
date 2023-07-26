import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Permission {
  ADMIN = 'Admin',
  CLIENT = 'Player',
}
export enum Status {
  ONLINE = 'Online',
  OCUPADO = 'Ocupado',
  NÃO_PERTUBAR = 'Não pertubar',
  OFFLINE = 'Offline',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Duplicated username entered'] })
  username: string;

  @Prop()
  fullname: string;

  @Prop({ unique: [true, 'Duplicated email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  cellphone: string;

  @Prop()
  permission: Permission;

  @Prop()
  status: Status;

  @Prop()
  profileImage: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);
