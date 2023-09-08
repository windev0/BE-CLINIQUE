import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultationModule } from './consultation/consultation.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Patient } from './patient/entities/patient.entity';

@Module({
  imports: [
    ConsultationModule,
    PatientModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'c-clinique',
      username: 'postgres',
      password: 'winner@3002',
      entities: [User, Patient],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
