import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { MaritalStatusEnum, IPerson, SexEnum, UserType } from 'src/_shared';

export class CreateUserDto implements IPerson {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  birthPlace: string;

  @IsString()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  // @IsOptional()
  @IsPhoneNumber()
  phone: string;

  // @IsNotEmpty()
  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus: MaritalStatusEnum;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsEnum(UserType)
  type: UserType;
}
