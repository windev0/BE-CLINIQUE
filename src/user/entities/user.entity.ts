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

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password : string;

 @Column({nullable : false})
  type: UserType;

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

  @Column({nullable : true, unique : true})
  phone?: string;

  @Column()
  maritalStatus: MaritalStatusEnum;

  @Column({type : 'varchar'})
  address: string;

  @Column({type : 'date'})
  createdAt: Date;

  @Column({type : 'date'})
  updatedAt: Date;

  @Column({nullable : true, type : 'date'})
  deletedAt?: Date;
}
