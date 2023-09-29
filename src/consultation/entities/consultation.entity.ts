import { ReasonEnum } from 'src/_shared';
import { IConsultation, IHistory } from 'src/_shared/model/medical.model';
import { ATimestamp } from '../../_shared/interface/model.interface';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Prescription } from '../../prescription/prestation.entity';
@Entity()
export class Consultation extends ATimestamp implements IConsultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: ReasonEnum,
    default: ReasonEnum.ROUTINE_EXAMS,
  })
  reason: ReasonEnum;

  @Column({ type: 'simple-json' })
  history: IHistory;

  @Column({nullable: true})
  phone: string;

  @Column({ nullable: true })
  diagnosis: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  @ManyToOne(() => Patient, (patient) => patient.consultations)
  patient: Patient

  @OneToMany(() => Prescription, (patient) => patient.consultation, {cascade: true})
  prescriptions: Prescription
}
