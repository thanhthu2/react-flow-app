export interface ComponentResponse {
  id: number;
  name: string;
  node_type: string;
}

export enum QUERY_TYPE_ENUM {
  CUSTOM = 'custom',
  QUERY = 'query',
}
