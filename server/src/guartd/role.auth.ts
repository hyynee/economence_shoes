import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private roles: string[]
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log("roles",request.user) // undefined
    // console.log("check",request.user.data.role_id); // 1 == admin
    return this.roles.includes(request.user.data.role_id);
  }
}
