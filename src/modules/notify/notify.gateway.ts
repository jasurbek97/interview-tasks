import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
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
    !user && client.disconnect();
  }

  @SubscribeMessage('receive-message')
  async handleNotifyEvent(@ConnectedSocket() socket: Socket) {
    const receiver = await this.authService.getUserFromSocket(socket);
    const messages = await this.messageService.allMessages(receiver);
    this.server.sockets.emit('receive-message', {
      messages,
    });
  }
}
