import { Field, Input } from '@grafana/ui';
import React, { ChangeEvent } from 'react';
import { validateMinMaxLength, validRequired } from 'utils/rules';
import type { FormTagProps } from './types';

export const FormTag = ({ children, onSubmit, formMethods }: FormTagProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Name *" invalid={!!errors.name} error={errors?.name?.message}>
        <Input
          {...register('name', {
            required: validRequired('Name'),
            validate: {
              validateMinMaxLength: (value) => validateMinMaxLength('Name', value, 10, 2),
            },
          })}
          placeholder="Please enter the name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue('name', e.target.value);
          }}
        />
      </Field>
      <Field label="Description *" invalid={!!errors.description} error={errors?.description?.message}>
        <Input
          {...register('description', {
            required: validRequired('Description'),
            validate: {
              validateMinMaxLength: (value) => validateMinMaxLength('Description', value, 225, 2),
            },
          })}
          placeholder="Please enter the description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue('description', e.target.value);
          }}
        />
      </Field>
      {children}
    </form>
  );
};
