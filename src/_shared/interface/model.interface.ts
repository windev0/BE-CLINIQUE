import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IdentityDocTypeEnum } from '../enum/patient.enum';
import { IsNotEmpty, IsOptional, IsString, isNotEmpty } from 'class-validator';

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
export abstract class VitalConstant {
  @IsNotEmpty()
  weight: string;

  @IsNotEmpty()
  height: string;

  @IsNotEmpty()
  temperature: string;

  @IsOptional()
  heartRate?: string;

  @IsOptional()
  bloodPression?: string;
}

export interface Identity {
  type: IdentityDocTypeEnum;
  number: string;
}
