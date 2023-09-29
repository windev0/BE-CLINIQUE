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
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
// import { AuthGuard } from 'src/_shared/guard/auth/auth.guard';
import { Roles } from 'src/_shared/custom-decorator/role/role.decorator';

@Controller('consultation')
// @UseGuards(AuthGuard)
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  // create a new consultation
  @Post()
  @Roles('MEDECIN')
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  // Display all consultations
  @Get()
  @Roles('MEDECIN', 'INFIRMIER')
  findAll() {
    return this.consultationService.findAll();
  }

  // Get a specific consultation by its Id
  @Get(':id')
  @Roles('MEDECIN', 'INFIRMIER')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  // update a specific consultation by its Id
  @Patch(':id')
  @Roles('MEDECIN')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(id, updateConsultationDto);
  }

  // Delete a specific consultation by its Id
  @Delete(':id')
  @Roles('MEDECIN')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }
}
