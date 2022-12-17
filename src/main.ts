import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { MainModule } from './main.module';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
