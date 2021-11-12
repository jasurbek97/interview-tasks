import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({ namespace: 'notify', transports: ['websocket'] })
export class NotifyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessagesService,
  ) {}

  async handleConnection(client: Socket) {
    const user = await this.authService.getUserFromSocket(client);
    const messages = await this.messageService.allMessages(user);
    client.emit('receive_message', {
      data: messages,
    });
    client.emit('user', {
      data: user,
    });
  }
}
