export interface BaseModel {
  _id: string;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Date;

  createdBy?: string;
  createdDate?: Date;

  version?: number;
}
