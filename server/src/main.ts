import { ConfigService } from '@nestjs/config';
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
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'), () => {
    Logger.log(
      `Server running on port http://localhost:${configService.get<number>(
        'PORT',
      )}/${globalPrefix}`,
    );
  });
}
bootstrap();
