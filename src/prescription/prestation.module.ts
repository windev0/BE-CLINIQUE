import { Module } from '@nestjs/common';
import { PrescriptionController } from './prestation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/_shared/auth/auth.module';
import { Prescription } from './prestation.entity';
import { Consultation } from '../consultation/entities/consultation.entity';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation, Prescription]), AuthModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
