import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from '@app/common/helper/helper.module';
import { HelperService } from '@app/common/helper/helper.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule, UploadModule, UploadsService } from '@app/common';
import { User } from './models/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule.forFeature([User]),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HelperService,
    JwtService,
    UserRepository,
    UploadsService,
  ],
})
export class AppModule {}
