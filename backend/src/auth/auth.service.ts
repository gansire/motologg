import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  // Registro de usuário
  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    if (!email || !password || !name) {
      throw new ConflictException('Todos os campos são obrigatórios');
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: { id: true, email: true, name: true },
    });

    // Payload JWT
    const payload = { sub: user.id, email: user.email };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // Login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password: _, ...safeUser } = user;

    // Payload JWT
    const payload = { sub: user.id, email: user.email };

    return {
      user: safeUser,
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
