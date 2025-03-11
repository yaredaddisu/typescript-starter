import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema';
import { GetItemDto } from './create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(item: Partial<Item>): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async update(id: string, item: Partial<GetItemDto>): Promise<Item> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(id, item, {
      new: true,
    }).exec();
    if (!updatedItem) {
      throw new NotFoundException('Item not found');
    }
    return updatedItem;
  }

  async delete(id: string): Promise<Item> {
    const deletedItem = await this.itemModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException('Item not found');
    }
    return deletedItem;
  }
}
