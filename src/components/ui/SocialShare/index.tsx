'use client';
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
  facebook?: boolean;
  twitter?: boolean;
  linkedin?: boolean;
  whatsapp?: boolean;
  telegram?: boolean;
  pinterest?: boolean;
  reddit?: boolean;
  tumblr?: boolean;
  vk?: boolean;
  line?: boolean;
  weibo?: boolean;
  pocket?: boolean;
  bluesky?: boolean;
  threads?: boolean;
  email?: boolean;
  pinterestImage?: string;
};

export const SocialShare = ({
  className = '',
  url = 'https://example.com',
  title = 'Check out this project',
  description = 'Check out this amazing project',
  facebook = true,
  twitter = true,
  linkedin = true,
  whatsapp = true,
  telegram = true,
  pinterest = true,
  reddit = true,
  tumblr = true,
  vk = true,
  line = true,
  weibo = true,
  pocket = true,
  bluesky = true,
  threads = true,
  email = true,
  pinterestImage,
}: SocialShareProps) => {
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
            {facebook && (
              <FacebookShareButton url={url} title={title}>
                <FacebookButton />
              </FacebookShareButton>
            )}
            {twitter && (
              <TwitterShareButton url={url} title={title}>
                <TwitterButton />
              </TwitterShareButton>
            )}
            {linkedin && (
              <LinkedinShareButton url={url} title={title} summary={description}>
                <LinkedinButton />
              </LinkedinShareButton>
            )}
            {whatsapp && (
              <WhatsappShareButton url={url} title={title}>
                <WhatsappButton />
              </WhatsappShareButton>
            )}
            {telegram && (
              <TelegramShareButton url={url} title={title}>
                <TelegramButton />
              </TelegramShareButton>
            )}
            {pinterest && (
              <PinterestShareButton url={url} title={title} media={pinterestImage as string}>
                <PinterestButton />
              </PinterestShareButton>
            )}
            {tumblr && (
              <TumblrShareButton url={url} title={title}>
                <TumblrButton />
              </TumblrShareButton>
            )}
            {vk && (
              <VKShareButton url={url} title={title}>
                <VkButton />
              </VKShareButton>
            )}
            {line && (
              <LineShareButton url={url} title={title}>
                <LineButton />
              </LineShareButton>
            )}
            {weibo && (
              <WeiboShareButton url={url} title={title}>
                <WeiboButton />
              </WeiboShareButton>
            )}
            {pocket && (
              <PocketShareButton url={url} title={title}>
                <PocketButton />
              </PocketShareButton>
            )}
            {reddit && (
              <RedditShareButton url={url} title={title}>
                <RedditButton />
              </RedditShareButton>
            )}
            {bluesky && (
              <BlueskyShareButton url={url} title={title}>
                <BlueskyButton />
              </BlueskyShareButton>
            )}
            {threads && (
              <ThreadsShareButton url={url} title={title}>
                <ThreadsButton />
              </ThreadsShareButton>
            )}
            {email && (
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
