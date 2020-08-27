import { BadRequestException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { v4 } from 'uuid';

export abstract class BaseRepository<T extends Document, Y> {
  protected model: Model<T>;
  protected itemId: string;

  constructor(model: Model<T>, itemId: string) {
    this.model = model;
    this.itemId = itemId;
  }

  public async getAll(): Promise<T[]> {
    const res = await this.model.find();
    return res;
  }

  public async get(id: string): Promise<T> {
    try {
      const res = await this.model.findById(id);
      if (!res) {
        console.log('warning!');
        throw new BadRequestException('Couldnt find this Property');
      }
      return res;
    } catch (err) {
      throw new BadRequestException('Couldnt find this Property');
    }
  }

  async save(doc: Y, id: string): Promise<T> {
    const query = { [this.itemId]: id } as FilterQuery<T>;
    const prop = await this.model.findOneAndUpdate(
      query,
      { ...doc, [this.itemId]: v4() },
      { upsert: true, new: true },
    );

    return prop;
  }

  async delete(id: string): Promise<T> {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }
}
