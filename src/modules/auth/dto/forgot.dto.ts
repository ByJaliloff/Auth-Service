import { IsEmail, ApiProperty, IsNotEmpty } from 'class-validator';
export class ForgotDto {
  @ApiProperty({
    description: 'User email address',
    example: 'T7t4o@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
   email: string;
}
