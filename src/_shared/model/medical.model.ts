import { AnalysisTypeEnum, MedicationName } from './../enum/medical.enum';
import {
  AnalysisResultEnum,
  HistoryTypeEnum,
  PrescriptionTypeEnum,
  ReasonEnum,
} from '../enum/medical.enum';
import { Patient } from '../../patient/entities/patient.entity';
import { Consultation } from '../../consultation/entities/consultation.entity';

export interface IConsultation {
  reason: ReasonEnum;
  history: IHistory;
  diagnosis: string;
  phone: string;
  patientId?: string;
  patient?: Patient;
}

export interface IHistory {
  type: HistoryTypeEnum;
  startingDate: Date;
  closingDate: Date;
  description: string;
  observation: string;
}

export interface IMedicalAnalysis {
  type: AnalysisTypeEnum;
  result: AnalysisResultEnum;
  observation: string;
}

export interface IMedication {
  name: MedicationName;
  dosage: string;
  // frequency: string;
}

export interface IPrescription {
  consultationId?: string;
  // patientId?: string;
  type: PrescriptionTypeEnum;
  medication: IMedication;
  observation: string;
  consultation?: Consultation;
  patient?: Patient;
}
