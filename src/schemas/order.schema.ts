import * as mongoose from 'mongoose';
import { schemaOptions } from '../utils/index';

const OrderSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: true, index: true },
    owner: { type: String, default: 'Compra' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    car: [],
    cost: Number,
    description: String,
    currency: { type: String, default: 'USD' },
    location: {
      type: { type: String },
      coordinates: [],
    },
  },
  { ...schemaOptions },
);

OrderSchema.index({ location: '2dsphere' });
export default OrderSchema;
