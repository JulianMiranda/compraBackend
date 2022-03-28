import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from 'src/services/firebase.service';
import { flatten } from 'src/utils/util';
import { Order } from '../../dto/order.dto';
import { User } from '../../dto/user.dto';
import { NOTIFICATION } from '../../enums/notification.enum';
import { Subcategory } from '../../dto/subcategory.dto';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel('Notification') private notificationDb: Model<any>,
    @InjectModel('User') private usersDb: Model<User>,
    @InjectModel('Order') private orderDb: Model<Order>,
    @InjectModel('Subcategory') private subcategoryDb: Model<Subcategory>,
  ) {}

  async newOrder(type: NOTIFICATION, order: string): Promise<any> {
    try {
      const orderDB = await this.orderDb
        .findOne({ _id: order }, { cost: 1 })
        .lean();

      const usersJUN = await this.usersDb
        .find({ role: 'JUN' }, { notificationTokens: 1 })
        .lean();

      if (usersJUN.length === 0) return;

      const notificationsArray = [];

      for (const user of usersJUN) {
        notificationsArray.push({
          user: user._id,
          title: 'Nueva Orden',
          body: `Nueva orden para el 🧑 Wata ${orderDB.cost} $`,
          type,
          identifier: orderDB._id,
          notificationTokens: user.notificationTokens,
        });
      }

      const pushNotifications = notificationsArray.map((item) => {
        const { title, body } = item;
        return item.notificationTokens.map((token: string) => ({
          notification: {
            title,
            body,
          },

          token,
        }));
      });
      FirebaseService.sendPushNotifications(flatten(pushNotifications));
    } catch (e) {
      throw new InternalServerErrorException(
        'create notification Database error',
        e,
      );
    }
  }

  async createSubcategoryNotification(
    subcategoryId: string,
    type: NOTIFICATION,
  ): Promise<any> {
    try {
      console.log('Haciendo Notification');
      const subcategory = await this.subcategoryDb
        .findOne({ _id: subcategoryId })
        .populate([
          {
            path: 'images',
            match: { status: true },
            select: { url: true },
          },
          {
            path: 'category',
            select: { name: true },
          },
        ])
        .lean();
      const subscribers = await this.usersDb
        .find({ role: 'CUN' }, { notificationTokens: 1, name: 1 })
        .lean();

      if (subscribers.length === 0) return;

      const notificationsArray = [];
      let body = '';

      if (type === NOTIFICATION.NEW_SUBCATEGORY)
        body = `Hemos agregado un nuevo producto 🆕 ${subcategory.name.toLocaleUpperCase()} 🆕`;
      else if (type === NOTIFICATION.UPDATE_SUBCATEGORY)
        body = `🤩Se ha actualizado el precio ${subcategory.name.toLocaleUpperCase()}. Aprovecha ahora esta opotunidad única !!!!!`;

      for (const user of subscribers) {
        notificationsArray.push({
          user: user._id,
          subcategory,
          title: user.name,
          body,
          type,
          identifier: subcategory._id,
          notificationTokens: user.notificationTokens,
        });
      }

      await this.notificationDb.insertMany(notificationsArray);

      const pushNotifications = notificationsArray.map((item) => {
        const { title, user, subcategory } = item;
        return item.notificationTokens.map((token: string) => ({
          notification: {
            title: `Hola ▫️ ${title}`,
            body,
          },

          data: {
            userId: user.toString(),
            subcategory: JSON.stringify(subcategory),
            click_action: 'OPEN_SUBCATEGORY',
          },
          token,
        }));
      });

      FirebaseService.sendPushNotifications(flatten(pushNotifications));
    } catch (e) {
      throw new InternalServerErrorException(
        'create notification Database error',
        e,
      );
    }
  }
}
