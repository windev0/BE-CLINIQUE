import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested, IsUUID } from 'class-validator';
import { HistoryTypeEnum, ReasonEnum } from 'src/_shared';
import { IConsultation, IHistory } from 'src/_shared/model/medical.model';

export class HistoryDTO implements IHistory {
  @IsString()
  @IsEnum(HistoryTypeEnum)
  type: HistoryTypeEnum;

  @IsDateString()
  startingDate: Date;

  @IsDateString()
  closingDate: Date;

  @IsString()
  description: string;

  @IsString()
  observation: string;

}

export class CreateConsultationDto implements IConsultation {
  @IsString()
  @IsUUID()
  patientId: string;

  @IsString()
  @IsEnum(ReasonEnum)
  reason: ReasonEnum;

  @IsOptional()
  @ValidateNested()
  @Type(() => HistoryDTO)
  history: IHistory;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  diagnosis: string;
}
