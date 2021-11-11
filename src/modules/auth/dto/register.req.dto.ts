import { ApiProperty } from '@nestjs/swagger';
import { RegisterInterface } from '../interfaces/register.interface';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest implements RegisterInterface {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ default: 'test', description: 'Name of user' })
  name: string;

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
