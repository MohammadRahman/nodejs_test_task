import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { CreateUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/users')
  async getUsers() {
    return await this.appService.getUsers();
  }
  @Get('/mock/users')
  async getMockUsers() {
    return await this.appService.seeder();
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  @Post('/users')
  async postUser(
    @Req() req: Request,
    @Body() createUserDto: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // if (!file) {
    //   return {
    //     success: false,
    //     message: 'No file uploaded',
    //   };
    // }
    console.log('file in controller', file);
    console.log('dto', createUserDto);
    console.log('headers', req.headers);
    return await this.appService.postUser(req, createUserDto, file);
  }
  @Get('/token')
  async getToken() {
    return await this.appService.getToken();
  }
}
