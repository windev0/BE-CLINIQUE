import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      if (createPatientDto) {
        return await this.patientRepository.save(createPatientDto);
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PatientService.createPatient');
      throw error;
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepository.find();
    } catch (error) {}
  }

  async findOne(id: string): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOneBy({ id });
      if (patient) {
        return patient;
      }
      throw new NotFoundException('Patient not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PatientService.findOne');
      throw error;
    }
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    try {
      const patient = await this.findOne(id);
      if (patient) {
        await this.patientRepository.update(id, updatePatientDto);
        return patient;
      }
      throw new NotFoundException('Patient not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PatientService.Update');
      throw error;
    }
  }

  async remove(id: string): Promise<Patient[]> {
    try {
      const user = await this.findOne(id);
      if (user) {
        await this.patientRepository.delete(id);
        return this.findAll();
      }
      throw new NotFoundException('Patient not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PatientService.Update');
      throw error;
    }
  }
}
