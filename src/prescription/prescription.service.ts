import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPrescription } from 'src/_shared/model/medical.model';
import { Prescription } from './prestation.entity';
import { UpdatePrestationDto } from './prescription.dto';
import { Consultation } from '../consultation/entities/consultation.entity';

@Injectable()
export class PrescriptionService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Prescription)
    private readonly prestationRepository: Repository<Prescription>,
    
    // @InjectRepository(Patient)
    // private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
  ) {}

  async create(createPrestationDto: IPrescription) {
    try {
      const { consultationId } = createPrestationDto;
      // const patient = await this.patientRepository.findOneBy({id: patientId})
      const consultaion = await this.consultationRepository.findOneBy({id: consultationId})
      if (consultaion) {
        // createPrestationDto.patient = patient;
        createPrestationDto.consultation = consultaion;
        return await this.prestationRepository.save(createPrestationDto);
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationService.create');
      throw error;
    }
  }

  async findAll(): Promise<Prescription[]> {
    try {
      return await this.prestationRepository.find({
        relations: {consultation: {patient: true}}, 
        order: {createdAt: 'DESC'}
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationService.findAll');
      throw error;
    }
  }

  async findOne(id: string): Promise<Prescription> {
    try {
      const prestation = await this.prestationRepository.findOne({ relations: {consultation: {patient: true}}, where: {id} });
      if (prestation) {
        return prestation;
      }
      throw new NotFoundException('Prestation not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationtService.findOne');
      throw error;
    }
  }

  async update(id: string, updatePrestationDto: UpdatePrestationDto): Promise<Prescription> {
    try {
      const prestation = await this.findOne(id);
      if (prestation) {
        await this.prestationRepository.update(id, updatePrestationDto);
        return prestation;
      }
      throw new NotFoundException('Prestation not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PrescriptionService.Update');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const prescription = await this.findOne(id);
      if (prescription) {
        await this.prestationRepository.delete(id);
        return this.findAll();
      }
      throw new NotFoundException('consultaion not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::PrescriptionService.delete');
      throw error;
    }
  }
}
