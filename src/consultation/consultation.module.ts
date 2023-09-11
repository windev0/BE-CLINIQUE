import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { AuthModule } from 'src/_shared/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation]), AuthModule],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
