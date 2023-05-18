import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config,options } from './swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api-docs',app,document,options)
  await app.listen(3000);
}
bootstrap();
