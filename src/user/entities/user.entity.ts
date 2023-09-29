import { Exclude } from 'class-transformer';
import {
  SexEnum,
  MaritalStatusEnum,
  ITimestamp,
  IPerson,
  UserType,
  ATimestamp,
} from 'src/_shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends ATimestamp implements IPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password?: string;

  @Column()
  type: UserType;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable : true})
  birthDate: Date;

  @Column({nullable : true})
  birthPlace: string;

  @Column({ enum: SexEnum, default: SexEnum.MALE })
  sex: SexEnum;

  @Column({ nullable: true })
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

  async validatePassword?(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
