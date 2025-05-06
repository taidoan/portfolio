'use client';
import type { Social } from '@/payload-types';
import { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  BlueskyShareButton,
  VKShareButton,
  ThreadsShareButton,
} from 'react-share';
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

import clsx from 'clsx';
import style from './style.module.scss';

export type SocialShareProps = {
  className?: string;
  url?: string;
  title?: string;
  description?: string;
  pinterestImage?: string;
  data: Social;
};

export const SocialShare = ({
  className = '',
  url = 'https://example.com',
  title = 'Check out this project',
  description = 'Check out this amazing project',
  pinterestImage,
  data,
}: SocialShareProps) => {
  const enabledNetworks = data.shareNetworks;
  const [openShareMenu, setOpenShareMenu] = useState(false);

  return (
    <div className={clsx(className, { [style['social-share__container']]: openShareMenu })}>
      {!openShareMenu && (
        <Button buttonType='share' color='frosted-pearl' action={() => setOpenShareMenu(true)}>
          Share
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
            {enabledNetworks?.includes('facebook') && (
              <FacebookShareButton url={url} title={title}>
                <FacebookButton />
              </FacebookShareButton>
            )}
            {enabledNetworks?.includes('twitter') && (
              <TwitterShareButton url={url} title={title}>
                <TwitterButton />
              </TwitterShareButton>
            )}
            {enabledNetworks?.includes('linkedin') && (
              <LinkedinShareButton url={url} title={title} summary={description}>
                <LinkedinButton />
              </LinkedinShareButton>
            )}
            {enabledNetworks?.includes('whatsapp') && (
              <WhatsappShareButton url={url} title={title}>
                <WhatsappButton />
              </WhatsappShareButton>
            )}
            {enabledNetworks?.includes('telegram') && (
              <TelegramShareButton url={url} title={title}>
                <TelegramButton />
              </TelegramShareButton>
            )}
            {enabledNetworks?.includes('pinterest') && (
              <PinterestShareButton url={url} title={title} media={pinterestImage as string}>
                <PinterestButton />
              </PinterestShareButton>
            )}
            {enabledNetworks?.includes('tumblr') && (
              <TumblrShareButton url={url} title={title}>
                <TumblrButton />
              </TumblrShareButton>
            )}
            {enabledNetworks?.includes('vk') && (
              <VKShareButton url={url} title={title}>
                <VkButton />
              </VKShareButton>
            )}
            {enabledNetworks?.includes('line') && (
              <LineShareButton url={url} title={title}>
                <LineButton />
              </LineShareButton>
            )}
            {enabledNetworks?.includes('weibo') && (
              <WeiboShareButton url={url} title={title}>
                <WeiboButton />
              </WeiboShareButton>
            )}
            {enabledNetworks?.includes('pocket') && (
              <PocketShareButton url={url} title={title}>
                <PocketButton />
              </PocketShareButton>
            )}
            {enabledNetworks?.includes('reddit') && (
              <RedditShareButton url={url} title={title}>
                <RedditButton />
              </RedditShareButton>
            )}
            {enabledNetworks?.includes('bluesky') && (
              <BlueskyShareButton url={url} title={title}>
                <BlueskyButton />
              </BlueskyShareButton>
            )}
            {enabledNetworks?.includes('threads') && (
              <ThreadsShareButton url={url} title={title}>
                <ThreadsButton />
              </ThreadsShareButton>
            )}
            {enabledNetworks?.includes('email') && (
              <EmailShareButton url={url} subject={title} body={description}>
                <EmailButton />
              </EmailShareButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
