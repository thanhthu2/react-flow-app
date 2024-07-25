import React, { ChangeEvent, useMemo } from 'react';
import { FormComponentProps } from './types';
import { Box, Field, Input, Select, Tag, TextArea } from '@grafana/ui';
import { validateMinMaxLength, validRequired } from 'utils/rules';
import { Controller } from 'react-hook-form';
import { QUERY_TYPE_ENUM } from 'types/component.types';

const optionsQueryType = [
  { label: 'Custom', value: QUERY_TYPE_ENUM.CUSTOM },
  { label: 'Query', value: QUERY_TYPE_ENUM.QUERY },
];

export const FormComponent = ({ children, formMethods, onSubmit }: FormComponentProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formMethods;
  const watchQueryType = watch('query_type');
  const watchValues = watch('values');
  const listValues = watchValues.split(',');
  
  const renderFormByQueryType = useMemo(() => {
    if (watchQueryType === QUERY_TYPE_ENUM.CUSTOM)
      return (
        <>
          <Field label="Custom options - Value separated by comma">
            <TextArea
              style={{ minHeight: '100px' }}
              {...register('values')}
              onChange={(e: any) => setValue('values', e.target.value)}
            />
          </Field>
          <Field label="Preview of values">
            <Box display={'flex'} gap={1}>
              {listValues.map((value, idx) => {
                if (!value) return;
                return <Tag name={value} key={value + idx} colorIndex={9}/>;
              })}
            </Box>
          </Field>
        </>
      );

    return <></>;
  }, [watchQueryType, watchValues]);

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

      <Field label="Query type">
        <div>
          <Controller
            name="query_type"
            control={control}
            render={({ field }) => (
              <Select {...field} options={optionsQueryType} onChange={(v) => setValue('query_type', v?.value!)} />
            )}
          />
        </div>
      </Field>
      {renderFormByQueryType}
      {children}
    </form>
  );
};
