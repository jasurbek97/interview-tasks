import { MessageInterface } from '../interfaces/message.interface';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SendMessageRequest implements MessageInterface {
  @IsDefined()
  @IsString()
  text: string;

  @IsDefined()
  @IsEmail()
  email: string;
}
