import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultationModule } from './consultation/consultation.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Patient } from './patient/entities/patient.entity';
import { Consultation } from './consultation/entities/consultation.entity';
import { AuthModule } from './_shared/auth/auth.module';

@Module({
  imports: [
    ConsultationModule,
    PatientModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'c-clinique',
      username: 'postgres',
      password: 'winner@3002',
      entities: [User, Patient, Consultation],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
