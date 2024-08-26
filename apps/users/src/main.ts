import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const allowedOrigins = [
    'https://abz-agency-test-task-ui.vercel.app',
    'http://abz-agency-test-task-ui.vercel.app',
    'http://localhost:5173',
  ];
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization', // 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
