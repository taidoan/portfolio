import { ContactPlatform } from './index';

export type FlatContactMethodProps = {
  [K in ContactPlatform as `${K}`]: boolean;
} & {
  [K in ContactPlatform as `${K}Link`]?: string;
} & {
  [K in ContactPlatform as `${K}Label`]?: string;
};

export type ContactMethodsListProps = {
  className?: string;
} & FlatContactMethodProps;
