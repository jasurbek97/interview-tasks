import { ApiProperty } from '@nestjs/swagger';
import { LoginInterface } from '../interfaces/login.interface';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest implements LoginInterface {
  @IsDefined()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({ default: 'test@gmail.com', description: 'Email of user' })
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({ default: 'password', description: 'Password of user' })
  password: string;
}
