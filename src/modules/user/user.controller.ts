import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()

    @ApiOperation({ summary: 'List all users' })
    @ApiOkResponse({
        description: 'List of users',
        type: UserResponseDto,
        isArray: true,
    })
    list() {
        return this.userService.listAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @Param({ name: 'id', description: 'Unique indetifier of the user', example: 'usjedcs' })
    @ApiOkResponse({
        description: 'User found',
        type: UserResponseDto
    })
    @ApiNotFoundResponse({ description: 'User not found' }) 
    get(@Param('id') id: string) {
        const user = this.userService.findById(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }
}
