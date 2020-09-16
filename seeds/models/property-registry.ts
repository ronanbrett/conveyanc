import {
  Column as Property,
  Entity as Collection,
  ObjectIdColumn,
} from "typeorm";
import { ObjectId } from "mongodb";

@Collection("property-registry")
export class PropertyRegistry {
  @ObjectIdColumn() readonly id: ObjectId;

  @Property() dateOfSale: Date;
  @Property() address: string;
  @Property() stringOfSale: string;
  @Property() postCode: string;
  @Property() county: string;
  @Property() price: string;
  @Property() notFullMarketPrice: string;
  @Property() VATExclusive: string;
  @Property() description: string;
  @Property() propertySize: string;
}
