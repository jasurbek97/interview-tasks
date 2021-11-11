import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { UsersService } from '../users/users.service';
import { MessageInterface } from './interfaces/message.interface';
import { UserInterface } from '../users/interfaces/user.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UsersService,
  ) {}

  async send(
    user: UserEntity,
    request: MessageInterface,
    filePath: string,
  ): Promise<MessageEntity> {
    const { text, email } = request;
    const receiver = await this.userService.findOne(email);
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }
    const message = new MessageEntity();
    message.filePath = filePath;
    message.text = text;
    message.sender = user;
    message.receiver = receiver;
    return await this.messageRepository.save(message);
  }

  async allMessages(receiver: UserInterface): Promise<MessageEntity[]> {
    return await this.messageRepository.find({ receiver: receiver });
  }
}
