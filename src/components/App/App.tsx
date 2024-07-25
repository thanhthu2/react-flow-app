import { AppRootProps } from '@grafana/data';
import '@xyflow/react/dist/style.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { listRoute } from 'routes';
export function App(props: AppRootProps) {
  return (
    <Routes>
      {listRoute.map((route, idx) => {
        const Page = route.component;
        const element = <Page />;
        return <Route key={idx} path={route.path} element={element} />;
      })}
    </Routes>
  );
}
