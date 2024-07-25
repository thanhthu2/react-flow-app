import { Box, Button, Divider } from '@grafana/ui';
import { Header } from 'components';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PLUGIN_BASE_URL, ROUTES } from 'utils/constants';
import { FormTag } from './FormTag';
import { FormTagModel } from './types';
import { PayloadCreateTag } from 'types/tag.types';

export const CreateTag = () => {
  const navigate = useNavigate();
  const formMethods: UseFormReturn<FormTagModel> = useForm<FormTagModel>({
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: PayloadCreateTag) => {
    const isValid = await formMethods.trigger();
    console.log({ isValid });
    console.log(data);
  };

  return (
    <>
      <Header icon="tag-alt" title="Create Tag" />
      <Divider />
      <FormTag onSubmit={onSubmit} formMethods={formMethods}>
        <Box display="flex" justifyContent={'flex-end'} gap={2} paddingTop={3}>
          <Button
            fill="outline"
            variant="secondary"
            onClick={() => navigate(`${PLUGIN_BASE_URL}/${ROUTES.TagManagement}`)}
          >
            Cancel
          </Button>
          <Button type="submit">Create Tag</Button>
        </Box>
      </FormTag>
    </>
  );
};
