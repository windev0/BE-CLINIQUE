import {
  IsDate,
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

  @IsDate()
  // @IsNotEmpty()
  birthDate: Date;

  @IsString()
  // @IsNotEmpty()
  birthPlace: string;

  // @IsNotEmpty()
  @IsString()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  // @IsNotEmpty()
  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus: MaritalStatusEnum;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;
}
