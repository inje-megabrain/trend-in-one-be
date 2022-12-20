import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import generateSwaggerDocument from './infrastructure/swagger/swagger.generator';
import { MainModule } from './main.module';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  // CORS 해결코드
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  SwaggerModule.setup('docs', app, generateSwaggerDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(process.env.APP_PORT || 13000, '' + '0.0.0.0');
})();
