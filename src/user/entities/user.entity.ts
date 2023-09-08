import {
  SexEnum,
  MaritalStatusEnum,
  ITimestamp,
  IPerson,
  UserType,
  ATimestamp,
} from 'src/_shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends ATimestamp implements IPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  type: UserType;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  birthPlace: string;

  @Column({ enum: SexEnum, default: SexEnum.MALE })
  sex: SexEnum;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ enum: MaritalStatusEnum, default: MaritalStatusEnum.MARRIED })
  maritalStatus: MaritalStatusEnum;

  @Column({ type: 'varchar' })
  address: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;
}
