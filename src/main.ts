import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

const swaggerOptions = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('SelloMx Api')
  .setDescription('SelloMx API')
  .setVersion('0.0.1')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
