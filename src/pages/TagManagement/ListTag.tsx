import { Button, ConfirmModal, Divider } from '@grafana/ui';
import { BasicTable, ColumnType, Header } from 'components';
import { useAlert } from 'hooks/useAlert';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'react-use';
import { TYPE_REQUEST } from 'types/alert.types';
import { TagResponse } from 'types/tag.types';
import { backendSrv, BASE_URL, MSG_ERROR, PLUGIN_BASE_URL, ROUTES } from 'utils/constants';
import { transformRequest } from 'utils/helpers';

export const ListTag = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TagResponse[] | []>([{ name: 'name', id: 1, description: 'description' }]);
  const [loading, setLoading] = useToggle(false);
  const { showAlert } = useAlert();
  const [currentId, setCurrentId] = useState<string | number>();
  const columns: Array<ColumnType<TagResponse>> = [
    {
      header: {
        title: 'ID',
      },
      dataIndex: 'id',
      key: 'id',
      align: 'left',
      render: (record) => record?.id,
    },
    {
      header: {
        title: 'Name',
      },
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      render: (record) => record?.name,
    },
    {
      header: {
        title: 'Description',
      },
      dataIndex: 'description',
      key: 'description',
      align: 'left',
      render: (record) => record?.description,
    },
    {
      header: {
        title: 'Actions',
      },
      dataIndex: 'actions',
      key: 'actions',
      align: 'left',
      render: (record) => (
        <Button variant="destructive" size="xs" onClick={() => setCurrentId(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const isOpen = Boolean(currentId);

  const toolbar = useMemo(
    () => (
      <div className="mr-20">
        <Button
          icon="plus"
          variant="primary"
          size="xs"
          onClick={() => navigate(`${PLUGIN_BASE_URL}/${ROUTES.CreateTag}`)}
        >
          Create tag
        </Button>
      </div>
    ),
    []
  );

  const handleDeleteTag = async () => {
    setLoading(true);
    const payload = JSON.stringify({ id: currentId });
    const [err] = await transformRequest(backendSrv.delete(`${BASE_URL}/delete-tag`, payload));
    setLoading(false);
    setCurrentId('');
    if (err) return showAlert(MSG_ERROR, TYPE_REQUEST.WARNING);
  };

  const getListTag = async () => {
    setLoading(true);
    const [err, res] = await transformRequest(backendSrv.get(`${BASE_URL}/tags`));
    setLoading(false);
    if (err) return showAlert(MSG_ERROR, TYPE_REQUEST.WARNING);

    setTableData(res.data);
  };

  useEffect(() => {
    getListTag();
  }, []);

  return (
    <>
      <Header icon="tag-alt" title="Tag management" subTitle="Manage all tag" toolbar={toolbar} />
      <Divider />
      <BasicTable tableData={tableData} columns={columns} isLoading={loading} />

      <ConfirmModal
        isOpen={isOpen}
        icon="trash-alt"
        title="Delete Confirmation"
        body={
          <div>
            Are you really sure to delete this tag? <br /> Note: You won’t be able to recover it.
          </div>
        }
        confirmText="Delete"
        onDismiss={() => setCurrentId('')}
        onConfirm={handleDeleteTag}
      />
    </>
  );
};
