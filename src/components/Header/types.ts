import { IconName } from "@grafana/data";
import { ReactElement, ReactNode } from "react";

export interface HeaderProps {
    icon?: IconName;
    title: ReactNode;
    subTitle?: ReactNode;
    toolbar?:ReactElement
    // footer: any;
  }