import { Checkbox } from '@grafana/ui';
import React, { useState } from 'react';

import { ColumnType } from './table.types';

type HeaderProps<RecordType> = {
  columns: Array<ColumnType<RecordType>>;
  checkable?: boolean;
  toggleCheckedAll?: (e: boolean) => void;
};

function TableHeader<RecordType>(HeaderProps: HeaderProps<RecordType>) {
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const { columns, checkable, toggleCheckedAll } = HeaderProps;

  const onChange = () => {
    setIsCheckAll((prev) => {
      toggleCheckedAll && toggleCheckedAll(!prev);
      return !prev;
    });
  };
  return (
    <tr>
      {checkable && (
        <th style={{ width: '20px' }}>
          <Checkbox value={isCheckAll} onChange={onChange} />
        </th>
      )}
      {columns.map((column) => (
        <th
          hidden={column.hidden}
          style={{
            textAlign: column.align || 'left',
            width: column.width || 'auto',
            padding: 12, // TODO: @thanhbh7 move to function getStyle
          }}
          key={column.key}
        >
          <span>{column.header.title}</span>
        </th>
      ))}
    </tr>
  );
}

export { TableHeader };
