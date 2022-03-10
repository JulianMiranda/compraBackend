import * as mongoose from 'mongoose';
import { THEME } from 'src/enums/theme.enum';
import { schemaOptions } from '../utils/index';

const UserSchema = new mongoose.Schema(
  {
    firebaseId: String,
    name: { type: String, index: true },
    email: String,
    phone: String,
    role: String,
    defaultImage: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    status: { type: Boolean, default: true, index: true },
    preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    notificationTokens: [{ type: String }],
    location: {
      type: { type: String },
      coordinates: [],
    },
    theme: {
      type: String,
      default: THEME.DEFAULT,
      enum: [THEME.DEFAULT, THEME.DARK, THEME.LIGHT],
    },
  },
  { ...schemaOptions },
);
UserSchema.index({ location: '2dsphere' });

export default UserSchema;
