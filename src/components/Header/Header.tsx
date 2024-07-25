import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';
import React, { PropsWithChildren } from 'react';
import { HeaderProps } from './types';
const getHeaderStyles = (theme: GrafanaTheme2) => {
  return {
    headerWrap: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '100%',
    }),
  };
};

export const Header = ({ icon = 'cog', title = '', subTitle = '', toolbar }: PropsWithChildren<HeaderProps>) => {
  const headerStyles = useStyles2(getHeaderStyles);

  return (
    <div className={headerStyles.headerWrap}>
      <header>
        <h2 className="main-title">
          <Icon name={icon} size="xl" /> &nbsp;
          {title}
        </h2>
        <p className="sub-title"> {subTitle} </p>
        <br />
      </header>
      <div>{toolbar}</div>
    </div>
  );
};
