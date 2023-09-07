import {
  SexEnum,
  MaritalStatusEnum,
  ITimestamp,
  IPerson,
  UserType,
} from 'src/_shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends ITimestamp implements IPerson {
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

  @Column()
  sex: SexEnum;

  @Column({ nullable: true })
  email?: string;

  @Column({nullable : true, unique : true})
  phone?: string;

  @Column()
  maritalStatus: MaritalStatusEnum;

  @Column()
  address: string;

  @Column({nullable : false})
  type: UserType;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({nullable : true})
  deletedAt?: Date;
}
