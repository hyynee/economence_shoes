import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }); // cors
  app.use(express.static("."));
  // Middleware để xử lý raw body cho Stripe Webhook
  app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));
  const config = new DocumentBuilder()
    .setTitle("BE_ShoesStore")
    .setVersion("1.1.3")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(8080);
}
bootstrap();

// nest g resource auth --no-spec



