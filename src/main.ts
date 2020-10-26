import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 8080

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server Running on PORT : ${port}.`)

  const options = new DocumentBuilder()
      .setTitle('API Inventory Service')
      .setDescription('Ini adalah API service Inventory')
      .setVersion('1.0')
      .addTag('Inventory')
      .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document);
}
bootstrap();
