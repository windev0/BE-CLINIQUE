import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { AuthModule } from 'src/_shared/auth/auth.module';
import { Patient } from '../patient/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation, Patient]), AuthModule],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
