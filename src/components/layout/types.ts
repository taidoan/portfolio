import { SiteSetting } from '@/payload-types';

export type SocialAccount = NonNullable<
  NonNullable<SiteSetting['socialAccounts']>['socialNetwork']
>[number];

export type SocialShare = NonNullable<
  NonNullable<SiteSetting['socialSharing']>['shareNetworks']
>[number];
