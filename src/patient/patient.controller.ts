import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/_shared/custom-decorator/role/role.decorator';
import { AuthGuard } from 'src/_shared/guard/auth/auth.guard';

@Controller('patient')
@UseGuards(AuthGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Roles('MEDECIN', 'INFIRMIER')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @Roles('MEDECIN', 'INFIRMIER')
  findAll() {
    return this.patientService.findAll();
  }

  @Roles('MEDECIN', 'INFIRMIER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Roles('MEDECIN', 'INFIRMIER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Roles('MEDECIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
