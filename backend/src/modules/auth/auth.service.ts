import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../database/entities';
import { RegisterDto, LoginDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;

        // Check if user exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role: UserRole.USER,
        });

        await this.userRepository.save(user);

        return { message: 'Registration successful', userId: user.id };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens
        const tokens = await this.generateTokens(user);

        // Save refresh token
        await this.userRepository.update(user.id, { refreshToken: tokens.refreshToken });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            ...tokens,
        };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('jwt.refreshSecret'),
            });

            const user = await this.userRepository.findOne({ where: { id: payload.sub } });
            if (!user || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const tokens = await this.generateTokens(user);
            await this.userRepository.update(user.id, { refreshToken: tokens.refreshToken });

            return tokens;
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string) {
        await this.userRepository.update(userId, { refreshToken: null });
        return { message: 'Logged out successfully' };
    }

    private async generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.secret'),
            expiresIn: this.configService.get('jwt.expiresIn'),
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.refreshSecret'),
            expiresIn: this.configService.get('jwt.refreshExpiresIn'),
        });

        return { accessToken, refreshToken };
    }

    async validateUser(userId: string) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
}
