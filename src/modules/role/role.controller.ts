import { Controller, Get } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Controller()
/* @UseGuards(AuthenticationGuard) */
export class RoleController {
  constructor(private roleRepository: RoleRepository) {}

  @Get('/getRoles')
  getRoles(): Promise<any> {
    return this.roleRepository.getRoles();
  }
}
