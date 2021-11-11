import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotifyGateway } from './notify.gateway';
import { MessagesModule } from '../messages/messages.module';

@Module({
  providers: [NotifyGateway],
  imports: [AuthModule, MessagesModule],
})
export class NotifyModule {}
