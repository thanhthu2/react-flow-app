import { LoadingPlaceholder } from '@grafana/ui';
import React from 'react';

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text = 'Loading', ...rest }: React.PropsWithChildren<LoadingProps>) => {
  return (
    <div
      {...rest}
      className="fill-height fill-width absolute"
      style={{
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        left: 0,
        top: 0,
      }}
    >
      <LoadingPlaceholder
        text={text}
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
