import { ApiProperty, IsEmail, IsEnum } from '@nestjs/swagger';
import { Role } from '../../../common/enums/role.enum';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier for user',
    example: '134fkjfnj445'
  })
  _id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'T7t4o@example.com'
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    description: 'Role associated with user',
    example: Role.USER,
    enum: Role,
    default: Role.USER
  })
  @IsEnum(Role, { message: `Role must be one of: ${Object.values(Role).join(', ')}` })
  role: Role;

  @ApiProperty({
    description: 'Date and time when user was created',
    example: '2022-01-01T00:00:00.000Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date and time when user was created',
    example: '2022-01-01T00:00:00.000Z'
  })
  updatedAt: string;
}
