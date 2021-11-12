import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterInterface } from './interfaces/register.interface';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../users/interfaces/user.interface';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { JWT_SECRET } from '../../environments';
import { TokenPayloadInterface } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, deletedAt, ...result } = user;
      return result;
    }
    return null;
  }

  async getUserFromSocket(socket: Socket): Promise<UserInterface> {
    const token = socket.handshake.auth.token;
    const user = await this.getUserFromToken(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async getUserFromToken(token: string): Promise<UserInterface> {
    const payload: TokenPayloadInterface = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });
    if (payload.email) {
      return await this.usersService.findOne(payload.email);
    }
  }

  async register(request: RegisterInterface): Promise<UserInterface> {
    const { email } = request;
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new BadRequestException('User already exists!');
    }
    return await this.usersService.create(request);
  }

  async login(payload: UserInterface) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      tokenType: 'Bearer',
      accessToken: this.jwtService.sign(payload),
    };
  }
}
