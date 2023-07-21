"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const fs = require("fs");
async function bootstrap() {
    try {
        const port = 3000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(bodyParser.json({ limit: '10mb' }));
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.enableCors({
            origin: ['https://lionhearth.vercel.app', 'http://localhost:3001'],
            methods: 'GET, POST, PUT, DELETE',
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        });
        const swaggerJson = JSON.parse(fs.readFileSync('/home/victoralves/Documentos/GitHub/Lionhearth/api/swagger.json', 'utf8'));
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerJson);
        swagger_1.SwaggerModule.setup('', app, document);
        console.log(`Status: 200 OK | Server running on http://localhost:${port}/`);
        await app.listen(port, '0.0.0.0');
        process.on('SIGINT', async () => {
            await app.close();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('Failed to start the server', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map