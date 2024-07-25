import { ReactNode } from "react";

export interface PageParams {
    limit: number;
    page: number;
  }
  
  export interface MetaPage extends PageParams {
    sort?: string;
    total_rows: number;
    total_page: number;
  }
  
  export interface DateInfo {
    created_at: Date;
    updated_at: Date;
  }
  
  export type DataResponse<T> = MetaPage & {
    rows: T[];
  };
  
  export interface PaginationInfo<T> {
    data: DataResponse<T>;
    status_code: number;
    status: string;
    message: string;
  }
  
  export interface SelectOptions<T> {
    value:T
    label:ReactNode
  }