import { IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, IsIP, IsString } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'T7t4o@example.com',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Password for user ( minimum 6 characters )',
    minLength: 6,
    example: 'password123',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiPropertyOptional({
    description: 'User IP address',
    example: '192.168.1.1',
  })
  @IsOptional() 
  @IsIP( undefined, { message: 'Invalid IP address' })
  ip?: string;

  @ApiPropertyOptional({
    description: 'User device',
    example: 'Chrome',
  })
  @IsString({ message: 'Device must be a string' })
  @IsOptional() device?: string;
}
