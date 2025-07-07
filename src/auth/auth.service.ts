import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existingUser = await this.userRepository.findUser({
      email: dto.email.toLowerCase(),
    });
    if (existingUser) {
      throw new ConflictException('email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
    });
    return await this.signUser(user);
  }
  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findUser({
      email: dto.email.toLowerCase(),
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const passwordCorrect = await bcrypt.compare(dto.password, user.password);
    if (!passwordCorrect)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
  async signUser(user: User) {
    const token = this.jwtService.sign({
      id: user.id,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return {
      access_token: token,
    };
  }
}
