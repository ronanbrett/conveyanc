import { BadRequestException } from '@nestjs/common';
import { Document, DocumentQuery, FilterQuery, Model } from 'mongoose';
import { v4 } from 'uuid';
import { Pagination } from '../interfaces/pagination.interface';

export abstract class BaseRepository<T extends Document, Y> {
  protected model: Model<T>;
  protected itemId: string;

  constructor(model: Model<T>, itemId: string) {
    this.model = model;
    this.itemId = itemId;
  }

  public async getAllPaged({
    first,
    after,
  }: {
    first: number;
    after?: string;
  }): Promise<Pagination<T>> {
    const query = after ? { _id: { $gt: after } } : ({} as any);
    const res = await this.model.find(query).limit(first);
    const count = await this.model.estimatedDocumentCount({});

    const paged: Pagination<T> = {
      totalCount: count,
      edges: res.map(result => ({ node: result, cursor: result._id })),
      properties: res,
      pageInfo: {
        endCursor: res[res.length - 1]._id,
      },
    };

    return paged;
  }

  public async getAll(): Promise<T[]> {
    const res = await this.model.find();
    return res;
  }

  public async get(objectId: string): Promise<T> {
    try {
      const res = await this.model.findById(objectId);
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
