import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiSendMessageBody } from '../../common/decorator/api.send.message.body';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../utils';
import { UserEntity } from '../users/entities/user.entity';
import { GetUser } from '../../common/decorator/get.user';
import { SendMessageRequest } from './dto/send.req.dto';

@ApiTags('MESSAGE')
@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '📨 Send message to user method' })
  @ApiConsumes('multipart/form-data')
  @ApiSendMessageBody()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('send')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: editFileName,
        destination: `./uploads`,
      }),
    }),
  )
  async send(
    @GetUser() user: UserEntity,
    @Body() request: SendMessageRequest,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.messageService.send(user, request, file.path);
  }
}
