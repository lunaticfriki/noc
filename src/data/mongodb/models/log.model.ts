import { model, Schema } from 'mongoose';

const logSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = model('Log', logSchema);
