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
import { CreatePrescriptionDto } from './prescription.dto';
import { UpdatePrestationDto } from './prescription.dto';
// import { AuthGuard } from 'src/_shared/guard/auth/auth.guard';
import { Roles } from 'src/_shared/custom-decorator/role/role.decorator';
import { PrescriptionService } from './prescription.service';

@Controller('prescription')
// @UseGuards(AuthGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  // create a new prescription
  @Post()
  @Roles('MEDECIN')
  create(@Body() data: CreatePrescriptionDto) {
    return this.prescriptionService.create(data);
  }

  // Display all prescriptions
  @Get()
  @Roles('MEDECIN', 'INFIRMIER')
  findAll() {
    return this.prescriptionService.findAll();
  }

  // Get a specific prescription by its Id
  @Get(':id')
  @Roles('MEDECIN', 'INFIRMIER')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  // update a specific prescription by its Id
  @Patch(':id')
  @Roles('MEDECIN')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdatePrestationDto,
  ) {
    return this.prescriptionService.update(id, updateConsultationDto);
  }

  // Delete a specific prescription by its Id
  @Delete(':id')
  @Roles('MEDECIN')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
