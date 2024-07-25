import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Checkbox, useStyles2 } from '@grafana/ui';
import React, { useMemo } from 'react';
import { TableCell } from './TableCell';
import { ColumnType } from './table.types';

interface Props<RecordType> {
  data: any[];
  columns: Array<ColumnType<RecordType>>;
  checkable?: boolean;
  handleSingleChecked?: (uid: string) => void;
  selectedKeys?: string[];
  isLoading: Boolean;
}

function TableRow<T>({
  data,
  columns,
  checkable,
  handleSingleChecked,
  selectedKeys,
  isLoading,
}: Props<T>): React.JSX.Element {
  const colSpan = columns.length + 1;
  const isEmpty = useMemo(() => {
    if (data?.length) {
      return null;
    }
    return (
      <tr style={{ textAlign: 'center' }}>
        <td colSpan={colSpan}>No Data</td>
      </tr>
    );
  }, [data]);

  const tableStyles = useStyles2(getTableStyles);

  const onChange = (uid: string) => {
    handleSingleChecked && handleSingleChecked(uid);
  };

  const isChecked = (uid: string) => {
    return selectedKeys?.includes(uid);
  };

  return (
    <>
      {data.map((element, index) => (
        <tr className={tableStyles.wrap} key={`table-body-${index}`}>
          {checkable && (
            <th style={{ width: '20px' }}>
              <Checkbox value={isChecked(element.uid)} onChange={() => onChange(element.uid)} />
            </th>
          )}
          {columns.map((column, columnIndex) => (
            <TableCell key={columnIndex} column={column} columnIndex={columnIndex} element={element} index={index} />
          ))}
        </tr>
      ))}
      {!isLoading && isEmpty}
    </>
  );
}

export const getTableStyles = (theme: GrafanaTheme2) => {
  return {
    wrap: css(`
    &:hover {
        background-color: ${theme.colors.action.hover} !important;
    }`),
  };
};

export { TableRow };
