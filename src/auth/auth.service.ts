import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validate(loginDto: LoginDto) {
    const user: User = await this.userService.getByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Password missmatch');
    }
    return user;
  }
}
