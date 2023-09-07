import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
