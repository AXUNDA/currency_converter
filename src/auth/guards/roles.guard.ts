import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    console.log({ roles });

    const roleValid = roles.some((role) => user?.role == role);
    if (!roleValid) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
    return roleValid;
  }
}
