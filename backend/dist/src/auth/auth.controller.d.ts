import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
