import { ApiBody } from '@nestjs/swagger';

export const ApiSendMessageBody =
  (fileName = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      required: true,
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'email',
            default: 'test@gmail.com',
            maxLength: 50,
          },
          text: {
            type: 'string',
            default: 'Hello 😄',
            maxLength: 250,
            minLength: 2,
          },
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
