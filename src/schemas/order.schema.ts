import * as mongoose from 'mongoose';
import { schemaOptions } from '../utils/index';

export const OrderSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: true, index: true },
    owner: { type: String, default: 'Julian' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    car: [],
    cost: Number,
    description: String,
    currency: { type: String, default: 'USD' },
    /* car: [
      {
        cantidad: Number,
        subcategory: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
      },
    ], */
  },
  { ...schemaOptions },
);
