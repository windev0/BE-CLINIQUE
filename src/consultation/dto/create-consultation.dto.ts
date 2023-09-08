import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReasonEnum } from 'src/_shared';
import { IConsultation, IHistory } from 'src/_shared/model/medical.model';

export class CreateConsultationDto implements IConsultation {
  @IsString()
  @IsNotEmpty()
  @IsEnum(ReasonEnum)
  reason: ReasonEnum;

  @IsString()
  @IsNotEmpty()
  history: IHistory;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;
}
