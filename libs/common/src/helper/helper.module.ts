import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [HelperService, JwtService],
})
export class HelperModule {}
