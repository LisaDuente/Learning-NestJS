import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      //this option is stripping out elements that are not definde in dto
      whitelist: true,
    }
  ));
  await app.listen(3333);
}
bootstrap();
