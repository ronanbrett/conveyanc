export interface Pagination<T> {
  totalCount: number;
  edges: {
    node: T;
    cursor;
  }[];
  pageInfo: {
    endCursor: string;
  };

  [name: string]: any;
}
