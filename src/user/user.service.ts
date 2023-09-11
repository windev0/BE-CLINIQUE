import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserType } from 'src/_shared';
@Injectable()
export class UserService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.findOneBy(createUserDto);
      if (createUserDto) {
        if (user) {
          throw new UnauthorizedException(
            `User with ${createUserDto.email} already exists`,
          );
        }
        return await this.userRepository.save(createUserDto);
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.createUser');
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {}
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (user) {
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.findOne');
      throw error;
    }
  }
  async findOneBy(param: Partial<User>, roles?: UserType[]): Promise<User> {
    try {
      const { email } = param;
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.findOne');
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user) {
        await this.userRepository.update(id, updateUserDto);
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.Update');
      throw error;
    }
  }

  async remove(id: string): Promise<User[]> {
    try {
      const user = await this.findOne(id);
      if (user) {
        await this.userRepository.delete(id);
        return this.findAll();
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.Update');
      throw error;
    }
  }
}
