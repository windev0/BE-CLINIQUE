import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IdentityDocTypeEnum } from '../enum/patient.enum';

export abstract class ITimestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export abstract class ATimestamp implements ITimestamp {
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deletedAt?: Date;
}
export interface VitalConstant {
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
