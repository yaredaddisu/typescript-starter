import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';



import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetPlayersDto, UpdateBanDto } from './dto/create-users.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Players') // Adds a tag in Swagger UI
@Controller('players')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }



    @Get()
    @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findAll(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('searchTerm') searchTerm?: string,
        @Query('columnName') columnName?: string,
        @Query('filterValue') filterValue?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ): Promise<{ success: boolean; data: User[]; metaData: any; message?: string }> {
        const response = await this.usersService.findAll(page, pageSize, searchTerm, columnName, filterValue, startDate, endDate);

        return {
            success: response.success,
            data: response.data || [],
            metaData: response.metaData || { totalCount: 0, currentPage: page, pageSize, totalPages: 0 },
            message: response.message || 'Operation completed',
        };
    }
    // "message": "Cannot PUT /67d0015ebbd162f7f006f596/players/ban",

    @Put(':id/ban') // Make sure this is the correct endpoint
    @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()

    async updateBan(@Param('id') id: string, @Body() updateBanDto: UpdateBanDto) {
      const { isBan } = updateBanDto; // Assuming you are passing the `isBan` field in the body
      return this.usersService.updateBan(id, isBan);
    }

    @Get(':id')
    @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        description: 'Retrieve an item by ID',
        schema: {
            example: {
                _id: "67cb25428a8cc11c2a11b322",
                chatId: "7245407632",
                firstName: "perfect",
                lastName: "string",
                username: "perfect_suilt",
                phoneNumber: "251922114487",

            },
        },
    })
    @ApiNotFoundResponse({ description: 'Item not found' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        description: 'Update an item by ID',
        type: GetPlayersDto, // This directly uses the DTO in Swagger
    })
    @ApiOkResponse({
        description: 'Update an item by ID',
        schema: {
            example: {
                _id: "67cb25428a8cc11c2a11b322",
                chatId: "7245407632",
                firstName: "perfect",
                lastName: "string",
                username: "perfect_suilt",
                phoneNumber: "251922114487",

            },
        },
    })
    @ApiBody({
        description: 'Editable item data',
        type: GetPlayersDto, // This shows the DTO fields in Swagger
    })
    async update(
        @Param('id') id: string,
        @Body() item: Partial<GetPlayersDto>,
    ): Promise<any> {
        const updatedItem = await this.usersService.update(id, item);
        return { ...updatedItem, message: 'Item updated successfully' };
    }

    @Delete(':id')
    @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        description: 'Item deleted successfully',
        schema: {
            example: {
                message: 'Item deleted successfully',
            },
        },
    })
    @ApiNotFoundResponse({ description: 'Item not found' })
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        await this.usersService.delete(id);
        return { message: 'Item deleted successfully' };
    }

}
