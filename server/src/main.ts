import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  await app.listen(process.env.PORT, () => {
    Logger.log(
      `Server running on port http://localhost:${process.env.PORT}/${globalPrefix}`,
    );
  });
}
bootstrap();
