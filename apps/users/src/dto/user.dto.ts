import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPhoneNumber } from '@app/common';

export class CreateUserDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  @IsNotEmpty()
  @IsString()
  position_id: string;
  photo: File;
}
