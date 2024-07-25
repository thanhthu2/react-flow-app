import { css, cx } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { HorizontalGroup, Pagination, Select, useStyles2 } from '@grafana/ui';
import React, { useMemo, useState } from 'react';

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableProps } from './table.types';
import { Loading } from 'components';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    table: css`
      margin-top: ${theme.spacing(3)};
      min-height: 600px;
    `,
    pagination: css`
      align-items: baseline;
    `,
  };
};

const options = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

function BasicTable<RecordType>(tableProps: TableProps<RecordType>) {
  const {
    columns,
    showHeader = true,
    checkable = false,
    showPaging = true,
    tableData = [],
    toggleCheckedAll,
    handleSingleChecked,
    selectedKeys,
    isLoading,
  } = tableProps;

  const styles = useStyles2(getStyles);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(options[0].value);

  const numberOfPages = useMemo(() => {
    return Math.ceil(tableData.length / pageSize);
  }, [tableData, pageSize]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, tableData.length);

    return tableData.slice(startIndex, endIndex);
  }, [tableData, pageSize, page]);

  return (
    <div className={cx(styles.table, 'admin-list-table relative')}>
      <table className="filter-table form-inline">
        {showHeader && (
          <thead>
            <TableHeader columns={columns} checkable={checkable} toggleCheckedAll={toggleCheckedAll} />
          </thead>
        )}
        <tbody>
          <TableRow
            columns={columns}
            data={paginatedData}
            checkable={checkable}
            handleSingleChecked={handleSingleChecked}
            selectedKeys={selectedKeys}
            isLoading={isLoading}
          />
        </tbody>
        <br />
      </table>
      {isLoading && <Loading />}
      {showPaging && (
        <div className="absolute" style={{ right: 0, bottom: 0 }}>
          <HorizontalGroup align="flex-end" justify="flex-end" height="auto">
            <Pagination
              numberOfPages={numberOfPages}
              currentPage={page}
              onNavigate={(toPage: number) => setPage(toPage)}
            />
            <Select options={options} value={pageSize} onChange={(e) => setPageSize(e.value!)} />
          </HorizontalGroup>
        </div>
      )}
    </div>
  );
}

export default BasicTable;
