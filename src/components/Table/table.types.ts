import { MetaPage } from 'types/base.types';

type DataIndex = string | number | ReadonlyArray<string | number>;

export interface HeaderType {
  title: React.ReactNode;
  isCustomHeader?: boolean;
}

export interface ColumnType<RecordType> {
  header: HeaderType;
  width?: number | string;
  key: string;
  dataIndex?: DataIndex;
  align?: 'center' | 'left' | 'right';
  render: (record: RecordType, index: number) => React.ReactNode;
  hidden?: boolean;
}

export type TableProps<RecordType> = {
  columns: Array<ColumnType<RecordType>>;
  showHeader?: boolean;
  checkable?: boolean;
  showPaging?: boolean;
  tableData: any[];
  setPageOptions?: React.Dispatch<React.SetStateAction<MetaPage>>;
  selectedKeys?: string[];
  toggleCheckedAll?: (isCheckedAll: boolean) => void;
  handleSingleChecked?: (uid: string) => void;
  isLoading: Boolean;
};
