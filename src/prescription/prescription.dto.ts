import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsString, IsEnum, IsDateString, IsUUID, ValidateNested, IsOptional, IsPhoneNumber } from "class-validator";
import { HistoryTypeEnum, MedicationName, PrescriptionTypeEnum } from "../_shared";
import { IPrescription, IMedication } from "../_shared/model/medical.model";



export class MedicationDTO implements IMedication {
  @IsString()
  @IsEnum(MedicationName)
  name: MedicationName;

  @IsString()
  dosage: string;
}

export class CreatePrescriptionDto implements IPrescription {
  
  @IsString()
  @IsUUID()
  consultationId: string;

  @IsString()
  @IsEnum(PrescriptionTypeEnum)
  type: PrescriptionTypeEnum;

  @ValidateNested()
  @Type(() => MedicationDTO)
  medication: IMedication;

  @IsOptional()
  @IsString()
  observation: string;
}

export class UpdatePrestationDto extends PartialType(CreatePrescriptionDto) {
  @IsString()
  @IsUUID()
  id: string;
}

