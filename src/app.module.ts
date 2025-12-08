import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from "./modules/mongo/mongo.module"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { MailModule } from "./modules/mail/mail.module"
import { RedisModule } from "./modules/redis/redis.module"
import { KafkaModule } from "./modules/kafka/kafka.module"
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./ormconfig"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UserModule,
    MongoModule,
    MailModule,
    RedisModule,
    KafkaModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule { }
