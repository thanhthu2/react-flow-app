import { getBackendSrv } from '@grafana/runtime';
import pluginJson from '../plugin.json';

export const pluginId = pluginJson.id;

export const PLUGIN_BASE_URL = `/a/${pluginId}`;
export const BASE_URL = `api/plugins/${pluginId}/resources/v1`
export const backendSrv = getBackendSrv()
export enum ROUTES {
  //Tag Management
  TagManagement = 'tag-management',
  CreateTag = 'create-tag',
  EditTag = 'edit-tag',

  //Component Management
  ComponentManagement = 'component-management',
  CreateComponent = 'create-component',
  EditComponent = 'edit-component/:id',

  //Relation management
  RelationManagement = 'relation-management',
}

export const MSG_ERROR = 'Something went wrong. Please wait a few minutes before you try again or contact support team';
export const NaN = 'NaN';
