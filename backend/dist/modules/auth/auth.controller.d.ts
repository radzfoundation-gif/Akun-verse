import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../database/entities").UserRole;
        };
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
