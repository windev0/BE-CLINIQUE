import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { AuthGuard } from 'src/_shared/guard/auth/auth.guard';
import { AuthModule } from 'src/_shared/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
