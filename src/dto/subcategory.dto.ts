import { IsString, IsNumber, IsArray } from 'class-validator';
import { Document } from 'mongoose';
import { Image } from './image.dto';

export class Subcategory extends Document {
  @IsString()
  name: string;

  @IsArray()
  images: Array<Partial<Image>>;

  @IsArray()
  deleteImages: string[];

  @IsString()
  category: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  price: number;

  @IsNumber()
  priceGalore: number;

  @IsNumber()
  stock: number;

  @IsString()
  currency: string;

  @IsArray()
  aviableSizes: string[];
}
