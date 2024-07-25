import { ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { QUERY_TYPE_ENUM } from 'types/component.types';

export type FormComponentModel = {
  name: string;
  query_type: QUERY_TYPE_ENUM;
  values: string;
};

export interface FormComponentProps {
  children: ReactElement;
  onSubmit: (data: FormComponentModel) => Promise<void>;
  formMethods: UseFormReturn<FormComponentModel>;
}
