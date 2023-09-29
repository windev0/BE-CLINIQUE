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
      if (createUserDto) {
        const user = await this.findOneBy(createUserDto);
        if (user) {
          throw new UnauthorizedException(
            `User with ${createUserDto.email} already exists`,
          );
        }
        const newUser = await this.userRepository.save(createUserDto);
        return this.refactoryUser(newUser);
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.createUser');
      throw error;
    }
  }

  async createBulk(datas: CreateUserDto[]) {
    if (datas?.length > 0) {
      Promise.all(datas.map((data) => this.create(data)));
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const list = await this.userRepository.find();
      if (list?.length > 0) {
        return list.map((user) => this.refactoryUser(user));
      }
      return [];
    } catch (error) {}
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (user) {
        return this.refactoryUser(user);
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
      this.logger.error(error.message, 'ERROR::UserService.findOneBy');
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
        return await this.findAll();
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.Update');
      throw error;
    }
  }

  private refactoryUser(user: User): User {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      type: user.type,
      address: user.address,
      birthDate: user.birthDate,
      birthPlace: user.birthPlace,
      phone: user.phone,
      maritalStatus: user.maritalStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // deletedAt: user.deletedAt,
    };
  }
}
