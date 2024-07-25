import { Tooltip } from '@grafana/ui';
import React, { useEffect, useRef, useState } from 'react';
import { ColumnType } from './table.types';

type Props<T> = {
  column: ColumnType<T>;
  columnIndex: number;
  index: number;
  element: any;
};

export const TableCell = ({ column, columnIndex, element, index }: Props<any>) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflow(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);
  return (
    <td
      hidden={column.hidden}
      style={{ textAlign: column.align || 'left', padding: '12px' }}
      key={`table-row-cell-${columnIndex}`}
    >
      <div
        style={{ width: column.width || 'auto', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        ref={textRef}
      >
        {isOverflow ? (
          <Tooltip content={element[column.key]} placement='top-start'>
            <span>{column.render(element, index)}</span>
          </Tooltip>
        ) : (
          column.render(element, index)
        )}
      </div>
    </td>
  );
};
