import { AnalysisTypeEnum, MedicationName } from './../enum/medical.enum';
import {
  AnalysisResultEnum,
  HistoryTypeEnum,
  PrescriptionTypeEnum,
  ReasonEnum,
} from '../enum/medical.enum';

export interface IConsultation {
  reason: ReasonEnum;
  history: IHistory;
  diagnosis: string;
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

export interface PrescribedMedication {
  name: MedicationName;
  dosage: string;
  frequency: string;
}

export interface IPrescription {
  type: PrescriptionTypeEnum;
  medication: PrescribedMedication;
  observation: string;
}
