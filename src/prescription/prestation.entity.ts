import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ATimestamp, PrescriptionTypeEnum, ReasonEnum } from "../_shared";
import { IPrescription, IMedication } from "../_shared/model/medical.model";
import { Consultation } from "../consultation/entities/consultation.entity";

@Entity()
export class Prescription extends ATimestamp implements IPrescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: PrescriptionTypeEnum,
    default: PrescriptionTypeEnum.TO_BYE,
  })
  type: PrescriptionTypeEnum;

  @Column({ type: 'simple-json' })
  medication: IMedication;

  @Column({nullable: true})
  observation: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  @ManyToOne(() => Consultation, (consultation) => consultation.prescriptions)
  consultation: Consultation
}
