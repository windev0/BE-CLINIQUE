import { ReasonEnum } from 'src/_shared';
import { IConsultation, IHistory } from 'src/_shared/model/medical.model';
import { ATimestamp } from '../../_shared/interface/model.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
@Entity()
export class Consultation extends ATimestamp implements IConsultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    enum: ReasonEnum,
    default: ReasonEnum.ROUTINE_EXAMS,
  })
  reason: ReasonEnum;

  @Column({ nullable: false, type: 'simple-json' })
  history: IHistory;

  @Column({ nullable: false })
  diagnosis: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  // @Column({ type: 'simple-array' })
  // tab: Array<String>;
}
