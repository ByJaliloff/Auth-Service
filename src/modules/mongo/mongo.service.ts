import { Inject, Injectable } from '@nestjs/common';
import { Model, Schema, model } from 'mongoose';

export interface AuthLog {
  level: string;
  message: string;
  meta?: any;
  createdAt?: Date;
}

const AuthLogSchema = new Schema<AuthLog>({
  level: { type: String, required: true },
  message: { type: String, required: true },
  meta: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: () => new Date() },
});

@Injectable()
export class MongoService {
  private AuthLogModel: Model<AuthLog>;
  constructor(@Inject('MONGO') private readonly mongoose) {
    this.AuthLogModel = model<AuthLog>('AuthLog', AuthLogSchema);
  }

  async log(level: string, message: string, meta?: any) {
    try {
      await this.AuthLogModel.create({ level, message, meta });
    } catch (err) {
      console.error('Mongo log error', err);
    }
  }
}
