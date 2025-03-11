import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.schema';
import { CreateItemDto, GetItemDto } from './create-item.dto';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Items') // Adds a tag in Swagger UI
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  @ApiOkResponse({
    description: 'Item created successfully',
    schema: {
      example: {
        items: { id: 1, first_name: 'John', last_name: 'Doe' },
        message: 'Item created successfully',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  async createItem(@Body() item: CreateItemDto) {
    const createdItem = await this.itemsService.create(item);
    return { items: createdItem, message: 'Item created successfully' };
  }


  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieve an item by ID',
    schema: {
      example: {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update an item by ID',
    type: GetItemDto, // This directly uses the DTO in Swagger
  })
  @ApiOkResponse({
    description: 'Update an item by ID',
    schema: {
      example: {
        id: '1',
        first_name: 'John',
        last_name: 'Smith',
        message: 'Item updated successfully',
      },
    },
  })
  @ApiBody({
    description: 'Editable item data',
    type: CreateItemDto, // This shows the DTO fields in Swagger
  })
  async update(
    @Param('id') id: string,
    @Body() item: Partial<GetItemDto>,
  ): Promise<any> {
    const updatedItem = await this.itemsService.update(id, item);
    return { ...updatedItem, message: 'Item updated successfully' };
  }

  @Delete(':id')
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
    await this.itemsService.delete(id);
    return { message: 'Item deleted successfully' };
  }
  
}
