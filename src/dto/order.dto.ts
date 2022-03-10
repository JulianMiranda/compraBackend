import {
  IsArray,
  IsLatLong,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Document } from 'mongoose';

export class Order extends Document {
  @IsString()
  @IsMongoId()
  user: string;

  @IsArray()
  car: any[];

  @IsNumber()
  cost: number;

  @IsString()
  currency: string;

  @IsNumber()
  delivery: number;

  @IsNumber()
  totalCost: number;

  @IsLatLong()
  coordinates: any;

  @IsObject()
  location: any;
}
