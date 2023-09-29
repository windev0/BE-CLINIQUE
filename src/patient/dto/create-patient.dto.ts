import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  IPerson,
  Identity,
  MaritalStatusEnum,
  SexEnum,
  VitalConstant,
} from 'src/_shared';

export class CreatePatientDto implements IPerson {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  birthPlace: string;

  @IsString()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus: MaritalStatusEnum;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @ValidateNested()
  @IsOptional()
  identity?: Identity;

  @ValidateNested()
  @Type(() => VitalConstant)
  constant: VitalConstant;

  @IsString()
  job: string;

  @IsString()
  @IsPhoneNumber()
  emergencyContact: string;
}
