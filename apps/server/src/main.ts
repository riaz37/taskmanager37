import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get allowed origins from environment
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://taskmanager37.netlify.app',
  ].filter(Boolean);

  console.log('Allowed CORS origins:', allowedOrigins);

  // Enable CORS - no credentials needed for Authorization header auth
  app.enableCors({
    origin: allowedOrigins,
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
  console.log(`🚀 Application is running on: http://${host}:${port}`);
  console.log(`🌐 API Base URL: http://${host}:${port}/api`);
  console.log(`🔒 CORS enabled for origins: ${allowedOrigins.join(', ')}`);
  console.log(`🔑 Authentication: JWT via Authorization header only`);
}
bootstrap();
