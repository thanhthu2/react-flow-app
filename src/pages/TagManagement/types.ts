import { ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormTagModel = {
  name: string;
  description: string;
};

export interface FormTagProps {
  children: ReactElement;
  onSubmit: (data: FormTagModel) => Promise<void>;
  formMethods: UseFormReturn<FormTagModel>;
}
