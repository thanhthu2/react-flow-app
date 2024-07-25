import { Button, ConfirmModal, Divider } from '@grafana/ui';
import { BasicTable, ColumnType, Header } from 'components';
import { useAlert } from 'hooks/useAlert';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'react-use';
import { TYPE_REQUEST } from 'types/alert.types';
import { ComponentResponse } from 'types/component.types';
import { backendSrv, BASE_URL, MSG_ERROR, PLUGIN_BASE_URL, ROUTES } from 'utils/constants';
import { transformRequest } from 'utils/helpers';

export const ListComponent = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<ComponentResponse[] | []>([
    { name: 'name', id: 1, node_type: 'k8s_node' },
  ]);
  const [loading, setLoading] = useToggle(false);
  const { showAlert } = useAlert();
  const [currentId, setCurrentId] = useState<string | number>();
  const columns: Array<ColumnType<ComponentResponse>> = [
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
        title: 'Node type',
      },
      dataIndex: 'node_type',
      key: 'node_type',
      align: 'left',
      render: (record) => record?.node_type,
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
          onClick={() => navigate(`${PLUGIN_BASE_URL}/${ROUTES.CreateComponent}`)}
        >
          Create component
        </Button>
      </div>
    ),
    []
  );

  const handleDeleteComponent = async () => {
    setLoading(true);
    const payload = JSON.stringify({ id: currentId });
    const [err] = await transformRequest(backendSrv.delete(`${BASE_URL}/delete-component`, payload));
    setLoading(false);
    setCurrentId('');
    if (err) return showAlert(MSG_ERROR, TYPE_REQUEST.WARNING);
  };

  const getListComponent = async () => {
    setLoading(true);
    const [err, res] = await transformRequest(backendSrv.get(`${BASE_URL}/components`));
    setLoading(false);
    if (err) return showAlert(MSG_ERROR, TYPE_REQUEST.WARNING);

    setTableData(res.data);
  };

  useEffect(() => {
    getListComponent();
  }, []);

  return (
    <>
      <Header icon="tag-alt" title="Component management" subTitle="Manage all component" toolbar={toolbar} />
      <Divider />
      <BasicTable tableData={tableData} columns={columns} isLoading={loading} />

      <ConfirmModal
        isOpen={isOpen}
        icon="trash-alt"
        title="Delete Confirmation"
        body={
          <div>
            Are you really sure to delete this component? <br /> Note: You won’t be able to recover it.
          </div>
        }
        confirmText="Delete"
        onDismiss={() => setCurrentId('')}
        onConfirm={handleDeleteComponent}
      />
    </>
  );
};
