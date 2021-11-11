import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterRequest } from './dto/register.req.dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.req.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '🔐 Register user method' })
  @ApiBody({ description: 'Register user request body', type: RegisterRequest })
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() request: RegisterRequest) {
    return this.authService.register(request);
  }

  @ApiOperation({ summary: '🔒 Login user method' })
  @ApiBody({ description: 'Register user request body', type: LoginRequest })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '🔒 Get user method' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getUser(@Request() request) {
    return request.user;
  }
}
