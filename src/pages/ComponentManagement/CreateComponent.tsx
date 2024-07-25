import { Box, Button, Divider } from '@grafana/ui';
import { Header } from 'components';
import React from 'react';
import { FormComponent } from './FormComponent';
import { useNavigate } from 'react-router-dom';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormComponentModel } from './types';
import { QUERY_TYPE_ENUM } from 'types/component.types';
import { PLUGIN_BASE_URL, ROUTES } from 'utils/constants';

export const CreateComponent = () => {
  const navigate = useNavigate();
  const formMethods: UseFormReturn<FormComponentModel> = useForm<FormComponentModel>({
    mode: 'all',
    defaultValues: {
      name: '',
      query_type: QUERY_TYPE_ENUM.CUSTOM,
      values:''
    },
  });

  const onSubmit = async (data: any) => {
    const isValid = await formMethods.trigger();
    console.log({ isValid });
    console.log(data);
  };
  return (
    <>
      <Header icon="tag-alt" title="Create Component" />
      <Divider />
      <FormComponent onSubmit={onSubmit} formMethods={formMethods}>
        <Box display="flex" justifyContent={'flex-end'} gap={2} paddingTop={3}>
          <Button
            fill="outline"
            variant="secondary"
            onClick={() => navigate(`${PLUGIN_BASE_URL}/${ROUTES.ComponentManagement}`)}
          >
            Cancel
          </Button>
          <Button type="submit">Create Component</Button>
        </Box>
      </FormComponent>
    </>
  );
};