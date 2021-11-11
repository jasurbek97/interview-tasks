import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): any {
    return {
      name: 'Interview tasks',
      docs: '/docs',
    };
  }
}
