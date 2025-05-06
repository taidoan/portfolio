'use client';
import type { Social } from '@/payload-types';
import { useState } from 'react';
import { Button } from '@components/ui/Button';
import { IconX } from '@tabler/icons-react';
import {
  FacebookButton,
  TwitterButton,
  LinkedinButton,
  EmailButton,
  TelegramButton,
  WhatsappButton,
  PinterestButton,
  RedditButton,
  TumblrButton,
  LineButton,
  WeiboButton,
  PocketButton,
  BlueskyButton,
  VkButton,
  ThreadsButton,
} from '@components/ui/SocialShare/buttons';
import { AUTHOR_NAME } from '@/lib/constants';

import clsx from 'clsx';
import style from './style.module.scss';

export type SocialShareProps = {
  className?: string;
  url?: string;
  title?: string;
  description?: string;
  pinterestImage?: string;
  summary?: string;
  data?: Social;
  buttonLabel?: string;
};

export const SocialShare = ({
  className = '',
  url = 'https://example.com',
  title = 'Check out this project',
  description = 'Check out this amazing project',
  pinterestImage,
  data,
  buttonLabel = 'Share',
}: SocialShareProps) => {
  const enabledNetworks = data?.shareNetworks;
  const [openShareMenu, setOpenShareMenu] = useState(false);

  return (
    <div className={clsx(className, { [style['social-share__container']]: openShareMenu })}>
      {!openShareMenu && (
        <Button buttonType='share' color='frosted-pearl' action={() => setOpenShareMenu(true)}>
          {buttonLabel}
        </Button>
      )}
      {openShareMenu && (
        <>
          <IconX
            stroke={4}
            onClick={() => setOpenShareMenu(false)}
            className={style.close__button}
            aria-label='Close Share Menu'
          />
          <div className={style.social__list}>
            {enabledNetworks?.includes('facebook') && <FacebookButton url={url} title={title} />}
            {enabledNetworks?.includes('twitter') && (
              <TwitterButton url={url} title={title} description={description} />
            )}
            {enabledNetworks?.includes('linkedin') && (
              <LinkedinButton url={url} title={title} summary={description} source={AUTHOR_NAME} />
            )}
            {enabledNetworks?.includes('whatsapp') && <WhatsappButton url={url} title={title} />}
            {enabledNetworks?.includes('telegram') && <TelegramButton url={url} title={title} />}
            {enabledNetworks?.includes('pinterest') && (
              <PinterestButton
                url={url}
                title={title}
                pinterestImage={pinterestImage}
                description={description}
              />
            )}
            {enabledNetworks?.includes('tumblr') && (
              <TumblrButton url={url} title={title} caption={description} />
            )}
            {enabledNetworks?.includes('vk') && <VkButton url={url} title={title} />}
            {enabledNetworks?.includes('line') && <LineButton url={url} title={title} />}
            {enabledNetworks?.includes('weibo') && <WeiboButton url={url} title={title} />}
            {enabledNetworks?.includes('pocket') && <PocketButton url={url} title={title} />}
            {enabledNetworks?.includes('reddit') && <RedditButton url={url} title={title} />}
            {enabledNetworks?.includes('bluesky') && <BlueskyButton url={url} title={title} />}
            {enabledNetworks?.includes('threads') && <ThreadsButton url={url} title={title} />}
            {enabledNetworks?.includes('email') && (
              <EmailButton url={url} title={title} description={description} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
