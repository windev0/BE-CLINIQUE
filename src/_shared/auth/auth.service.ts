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
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 12);

      const user = await this.userService.create({
        ...createUserDTO,
        password: hashedPassword,
      });

      if (user) {
        return {
          message: 'User created sucessfully',
          user: this.refactoryUser(user),
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

  async signIn(data: ILoginDTO): Promise<{ accessToken: string }> {
    const {user} = await this.validateUserPassword(data);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, ...this.refactoryUser(user) };

  }

  async validateUserPassword(data: ILoginDTO) {
    const { email, password } = data;
    const user = await this.userService.findOneBy({ email });
    if (user && await user.validatePassword(password)) {
      return {
        message: 'User logged in succesfully',
        user: this.refactoryUser(user),
      };
    } else {
        throw new UnauthorizedException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
  }

  private refactoryUser(user: any) {
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
      // deletedAt: user.deletedAt,
    };
  }
}
