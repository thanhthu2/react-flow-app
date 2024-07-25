import { PluginPage } from '@grafana/runtime';
import React, { ReactNode } from 'react';

const pageNav: any = false;

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PluginPage pageNav={pageNav} renderTitle={() => null}>
      {children}
    </PluginPage>
  );
};
