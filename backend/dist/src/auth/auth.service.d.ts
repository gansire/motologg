import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            email: string;
            id: string;
        };
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
