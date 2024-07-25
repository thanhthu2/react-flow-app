export interface TagResponse {
  id: number;
  name: string;
  description: string;
}

export interface PayloadCreateTag {
  name: string;
  description: string;
}
