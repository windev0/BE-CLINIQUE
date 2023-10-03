import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';
import { IConsultation, IHistory } from 'src/_shared/model/medical.model';
import { HistoryTypeEnum } from 'src/_shared';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class ConsultationService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createConsultationDto: IConsultation) {
    try {
      const { patientId: patientId } = createConsultationDto;
      const patient = await this.patientRepository.findOneBy({id: patientId})
      if (patient) {
        createConsultationDto.patient = patient;
        return await this.consultationRepository.save(createConsultationDto);
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationService.create');
      throw error;
    }
  }

  async findAll(): Promise<Consultation[]> {
    try {
      return await this.consultationRepository.find({relations: {patient: true}, order: {createdAt: 'DESC'}});
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationService.findAll');
      throw error;
    }
  }

  async findOne(id: string): Promise<Consultation> {
    try {
      const consultation = await this.consultationRepository.findOne({ relations: {patient: true}, where: {id} });
      if (consultation) {
        return consultation;
      }
      throw new NotFoundException('Consultation not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsulationtService.findOne');
      throw error;
    }
  }

  async update(
    id: string,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<Consultation> {
    try {
      const consultation = await this.findOne(id);
      if (consultation) {
        await this.consultationRepository.update(id, updateConsultationDto);
        return consultation;
      }
      throw new NotFoundException('Consultation not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConultationService.Update');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const consultaion = await this.findOne(id);
      if (consultaion) {
        await this.consultationRepository.delete(id);
        return this.findAll();
      }
      throw new NotFoundException('consultaion not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ConsultationService.delete');
      throw error;
    }
  }

  async testArray() {
    const cons = new Consultation();
    cons.id = 'ea1e8bd4-25fc-456d-8ca8-e131baaab14a';
    cons.diagnosis = 'rien';
    cons.history = <IHistory>{
      type: HistoryTypeEnum.FAMILY_HISTORY,
      startingDate: new Date('2003-04-01'),
      closingDate: new Date('2003-04-01'),
      description: 'dddddddd',
      observation: 'iiiiiiiii',
    };
    // cons.tab = ["hhh"];
    // cons.tab.push("ddd")
    // cons.tab.push("amama")
    // console.log('Array', cons.tab);
    console.log(cons);
  }
}
