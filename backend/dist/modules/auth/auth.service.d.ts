import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../database/entities';
import { RegisterDto, LoginDto } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
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
            role: UserRole;
        };
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    validateUser(userId: string): Promise<User | null>;
}
