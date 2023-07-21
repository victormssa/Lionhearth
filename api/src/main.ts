import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  try {
    const port = 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(bodyParser.json({ limit: '10mb' }));
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
      origin: ['https://lionhearth.vercel.app', 'http://localhost:3001'],
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    });

    const config = new DocumentBuilder()
      .setTitle('Lionhearth API')
      .setDescription(
        'The Lionhearth API provides endpoints to manage user accounts, access game data, and interact with the Lionhearth RPG platform.',
      )
      .setVersion('v0.0.1')
      .addTag('users') // Add tags for grouping related endpoints (optional)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // Include security scheme for JWT authorization (optional)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);
    console.log(`Status: 200 OK | Server running on http://localhost:${port}/`);
    await app.listen(port, '0.0.0.0');
    process.on('SIGINT', async () => {
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
  }
}
bootstrap();
