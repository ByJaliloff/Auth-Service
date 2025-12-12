import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UserService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiCreatedResponse({ description: 'User created. Check email for verification.' })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async register(@Body() dto: RegisterDto) {
        const user = await this.usersService.createUser(dto.email, dto.password, dto.name);
        const { token } = await this.usersService.createEmailVerification(user);
        // NOTE: token returned only in dev; in prod don't return token
        return { message: 'User created. Check email for verification.' };
    }

    @Get('verify-email')
    @ApiOperation({ summary: 'Verify user email' })
    @ApiQuery({ name: 'token', required: true, type: String, example: 'token123' })
    @ApiBadRequestResponse({ description: 'Token is required' })
    @ApiOkResponse({ description: 'Email verified successfully.', type: MessageResponseDto })
    async verify(@Query('token') token: string) {
        if (!token) throw new BadRequestException('Token is required');
        await this.usersService.confirmEmail(token);
        return { message: 'Email verified successfully.' };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiOkResponse({ description: 'User logged in successfully.', type: LoginResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async login(@Body() dto: LoginDto) {
        // ip/device could be provided by client or extracted from request in production
        return this.authService.login(dto.email, dto.password, dto.ip, dto.device);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh user access token' })
    @ApiOkResponse({ type: RefreshResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async refresh(@Body() dto: RefreshDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    @Post('forgot')
    @ApiOperation({ summary: 'Request password reset for user' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async forgot(@Body() dto: ForgotDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) return { message: 'If that email exists, a reset link was sent.' };
        await this.usersService.createPasswordReset(user);
        return { message: 'If that email exists, a reset link was sent.' };
    }

    @Post('reset')
    @ApiOperation({ summary: 'Reset user password' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async reset(@Body() dto: ResetDto) {
        await this.usersService.resetPassword(dto.token, dto.newPassword);
        return { message: 'Password reset successful.' };
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout user' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    async logout(@Body() dto: RefreshDto) {
        await this.authService.logout(dto.refreshToken);
        return { message: 'Logged out' };
    }
}
