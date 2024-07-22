import { Module } from '@nestjs/common';
import { UploadsService } from './upload.service';

@Module({
  imports: [],
  providers: [UploadsService],
})
export class UploadModule {}
