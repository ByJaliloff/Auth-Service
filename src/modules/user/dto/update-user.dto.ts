import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional, IsOptional, IsString } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        description: 'Optional refresh token associated with user session',
        example: 'refreshToken123',
    })
    @IsOptional()
    @IsString({ message : 'Refresh token must be a string' })
    refreshToken?: string;
}
