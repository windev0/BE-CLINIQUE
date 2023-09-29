import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private jwtService: JwtService,
    // 
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> { 
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    // get jwt cookie from the request
    const cookie = request.cookies['jwt']; 
    console.log('SOME ======= ', cookie, this.jwtService)
    const state = this.jwtService.verifyAsync(cookie).then(async (data) => {
      const user = await this.userService.findOne(data.id);

      if (roles.includes(user.type)) {
        return true;
      } else return false;
    });

    return state;
  }
}
