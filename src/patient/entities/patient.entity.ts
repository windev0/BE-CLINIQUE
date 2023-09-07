import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsDate } from 'class-validator';
import {
  ITimestamp,
  IPerson,
  MaritalStatusEnum,
  SexEnum,
  Identity,
  VitalConstant,
} from 'src/_shared';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient extends ITimestamp implements IPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  birthPlace: string;

  @Column({ nullable: false })
  sex: SexEnum;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: false })
  maritalStatus: MaritalStatusEnum;

  @Column()
  address: string;

  @Column()
  nationality: string;

  @Column({ nullable: true, type: 'simple-json' })
  identity?: Identity;

  @Column({ nullable: false, type: 'simple-json' })
  constant: VitalConstant;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: false })
  emergencyContact: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}
