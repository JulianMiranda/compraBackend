import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SubcategorySchema from '../../schemas/subcategory.schema';
import { ImageModule } from '../image/image.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryRepository } from './subcategory.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Subcategory',
        schema: SubcategorySchema,
      },
    ]),
    ImageModule,
    NotificationsModule,
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryRepository],
})
export class SubcategoryModule {}
