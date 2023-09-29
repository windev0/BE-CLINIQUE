import { ConflictException, Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
     app.use(cookieParser());
     app.enableCors();
     app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
     }))
  const PORT = 3001;
  const isPortTaken = (port, fn) => {
    const net = require('net');
    const tester = net.createServer()
    .once('error', (err) => {
      if (err.code !== 'EADDRINUSE') {
        return fn(err);
      }
      fn(null, true);
    })
    .once('listening', () => {
      tester.once('close', () => { fn(null, false); })
      .close();
    })
    .listen(port);
  };
  isPortTaken(PORT, async (err, res) => {
    try {
      if (!err) {
        if (res) {
          throw new ConflictException(
            {
              statusCode: 409,
              message: `Port ${PORT} already in use, please change your PORT`,
            },
            'Port Conflict detect',
          );
        } else {
          await app.listen(PORT, () => {
            const logger = new Logger('NestApplication');
            logger.log('Nest application successfully started at port ' + PORT);
            logger.log('Date::: ' + (new Date()).toISOString());
          });
        }
      } else {
        throw err;
      }
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  });
}
bootstrap();
