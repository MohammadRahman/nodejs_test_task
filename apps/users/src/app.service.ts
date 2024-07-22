import { HelperService } from '@app/common/helper/helper.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from './models/user.entity';
import tinify from 'tinify';
import { UploadsService } from '@app/common';

@Injectable()
export class AppService {
  constructor(
    private readonly heperService: HelperService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly uploadService: UploadsService,
  ) {
    tinify.key = 'gZzd51HGFTyzYn10xTvgvXQJn1b7Fxss';
  }
  private usedToken = new Map<string, string>();
  getHello(): string {
    return 'Hello World!';
  }
  async getUsers() {
    return await this.userRepository.find({});
  }
  async seeder() {
    return this.heperService.createUsers(50);
  }
  async postUser(req: Request, createUserDto: any, file: any) {
    let token = req.headers['authorization'];
    if (!token) {
      return 'please get a token';
    }
    token = token.split(' ')[1];
    console.log('token form ui', token);
    const isTokenAlreadyUsed = this.heperService.storeTokenInMemory(token);
    const isValidToken = await this.heperService.validateJwtToken(token);
    if (isValidToken) {
      if (isTokenAlreadyUsed) {
        return { success: false, message: 'token already used' };
      }
      const optimizedImage = await this.optimizeImage(file);
      const key = `${file.fieldname}${Date.now()}`;
      const imageUrl = await this.uploadService.uploadImage(
        key,
        optimizedImage,
      );
      const user = new User({ ...createUserDto, photo: imageUrl });
      const newUser = await this.userRepository.create(user);
      return {
        success: true,
        user_id: newUser.id,
        message: 'New user successfully registered',
      };
    }
    return {
      success: false,
      message: 'invalid token',
    };
  }
  async getToken() {
    const payload = 'token';
    const token = this.jwtService.sign(
      { payload },
      { secret: '123456', expiresIn: '40m' },
    );
    return {
      success: true,
      message: 'new token created',
      token,
    };
  }
  async optimizeImage(file: Express.Multer.File): Promise<Express.Multer.File> {
    try {
      const imageBuffer = file.buffer;
      const source = tinify.fromBuffer(imageBuffer);
      const resizedImage = source.resize({
        method: 'fit',
        width: 75,
        height: 75,
      });
      const optimizedImageBuffer = await resizedImage.toBuffer();

      // Update the buffer of the existing file
      file.buffer = Buffer.from(optimizedImageBuffer);

      return file;
    } catch (error) {
      throw new Error('Image optimization failed');
    }
  }
}
