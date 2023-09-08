import { MaritalStatusEnum, SexEnum, UserType } from '../enum/patient.enum';

export interface IPerson {
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthPlace: string;
  sex: SexEnum;
  email?: string;
  phone?: string;
  maritalStatus: MaritalStatusEnum;
  address: string;
}