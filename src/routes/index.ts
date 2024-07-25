import { CreateComponent, CreateTag, EditComponent, EditTag, ListComponent, ListTag, TheRelation } from 'pages';
import { ROUTES } from 'utils/constants';

export const listRoute = [
  {
    path: '*',
    component: ListTag,
  },
  {
    path: ROUTES.TagManagement,
    component: ListTag,
  },
  {
    path: ROUTES.CreateTag,
    component: CreateTag,
  },
  {
    path: `${ROUTES.EditTag}/:id`,
    component: EditTag,
  },
  {
    path: ROUTES.ComponentManagement,
    component: ListComponent,
  },
  {
    path: ROUTES.CreateComponent,
    component: CreateComponent,
  },
  {
    path: `${ROUTES.EditComponent}/:id`,
    component: EditComponent,
  },
  {
    path: ROUTES.RelationManagement,
    component: TheRelation,
  },
];
