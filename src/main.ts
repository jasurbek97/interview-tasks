import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './environments';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'http://localhost',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API docs')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter access token',
        in: 'header',
      } as any)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
    await app.listen(PORT);
  } catch (e) {
    Logger.error(e);
  }
}

bootstrap().catch((e) => {
  throw e;
});
