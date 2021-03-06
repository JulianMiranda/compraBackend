import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsLatLong,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { Document } from 'mongoose';

export class User extends Document {
  @IsString()
  firebaseId: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  serviceZone: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  role: string;

  @IsArray()
  permissions: string[];

  @IsString()
  defaultImage: string;

  @IsString()
  newFavorite: string;

  @IsString()
  removeFavorite: string;

  @IsString()
  notificationTokens: never;

  @IsString()
  theme: string;

  @IsLatLong()
  coordinates: any;

  @IsObject()
  location: any;
}
