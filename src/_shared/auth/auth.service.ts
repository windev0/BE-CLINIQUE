import {
  Injectable,
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ILoginDTO } from '../interface/auth.interface';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 12);

      const user = await this.userService.create({
        ...createUserDTO,
        password: hashedPassword,
      });

      if (user) {
        return {
          message: 'User created sucessfully',
          user: await this.refactoryUser(user),
        };
      } else {
        throw new BadRequestException('An error is occured when registering');
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.register');
      throw error;
    }
  }

  async login(loginDTO: ILoginDTO, response: Response): Promise<any> {
    try {
      const { email, password } = loginDTO;
      const user = await this.userService.findOneBy({ email });

      if (!user) {
        throw new BadRequestException('invalid credentials');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('invalid credentials');
      }

      const jwt = await this.jwtService.signAsync({ id: user.id });

      response.cookie('jwt', jwt, { httpOnly: true });

      return {
        message: 'User logged in succesfully',
        user: await this.refactoryUser(user),
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.login');
      throw error;
    }
  }

  async findOne(request: Request): Promise<{}> {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne(data.id);

      return await this.refactoryUser(user);
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.findOne');
      throw new UnauthorizedException();
    }
  }

  async logout(response: Response, request: Request): Promise<any> {
    try {
      const user = await this.findOne(request);
      response.clearCookie('jwt');

      return {
        message: 'User logged out succesfully',
        user: await this.refactoryUser(user),
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.register');
      throw error;
    }
  }

  async refactoryUser(user: any): Promise<{}> {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      type: user.type,
      address: user.address,
      birthDate: user.birthDate,
      birthPalce: user.birthPlace,
      phone: user.phone,
      maritalStatus: user.maritalStatus,
      createdAt: user.createdAt,
      updatedAtt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
