import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

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

    const swaggerJson = JSON.parse(
      fs.readFileSync(
        '/home/victoralves/Documentos/GitHub/Lionhearth/api/swagger.json',
        'utf8',
      ),
    );
    const document = SwaggerModule.createDocument(app, swaggerJson);
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
