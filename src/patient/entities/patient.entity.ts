import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsDate } from 'class-validator';
import {
  ITimestamp,
  IPerson,
  MaritalStatusEnum,
  SexEnum,
  Identity,
  VitalConstant,
  ATimestamp,
} from 'src/_shared';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consultation } from '../../consultation/entities/consultation.entity';

@Entity()
export class Patient extends ATimestamp implements IPerson {
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

  @Column({ nullable: false, default: SexEnum.MALE, enum: SexEnum })
  sex: SexEnum;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    nullable: false,
    default: MaritalStatusEnum.SINGLE,
    enum: MaritalStatusEnum,
  })
  maritalStatus: MaritalStatusEnum;

  @Column()
  address: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true, type: 'simple-json' })
  identity?: Identity;

  @Column({ nullable: false, type: 'simple-json' })
  constant: VitalConstant;

  @Column({ nullable: true })
  job?: string;

  @Column({ nullable: false })
  emergencyContact: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  @OneToMany(() => Consultation, (consultation) => consultation.patient, { onUpdate: 'CASCADE' })
  consultations: Consultation[]

  // @OneToMany(() => Prescription, (prescription) => prescription.patient, { onUpdate: 'CASCADE' })
  // prescriptions: Prescription[]
}
