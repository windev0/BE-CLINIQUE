import { IdentityDocTypeEnum } from "../enum/patient.enum";

export abstract class ITimestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface VitalConstant{
  weight: string;
  height: string;
  temperature: string;
  heartRate?: string;
  bloodPression?: string;
}

export interface Identity {
  type: IdentityDocTypeEnum;
  number: string;
}