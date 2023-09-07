import {
  IsDate,
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
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  birthPlace: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus: MaritalStatusEnum;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @ValidateNested()
  @IsOptional()
  identity?: Identity;

  @IsObject()
  @IsNotEmptyObject()
  constant: VitalConstant;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  emergencyContact: string;
}
