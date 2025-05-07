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

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandTumblr,
  IconBrandVk,
  IconBrandLine,
  IconBrandWeibo,
  IconBrandPocket,
  IconBrandBluesky,
  IconBrandThreads,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';

import style from './style.module.scss';
import clsx from 'clsx';

export type SocialShareProps = {
  url: string;
  title?: string;
  description?: string;
  pinterestImage?: string;
  summary?: string;
  source?: string;
  caption?: string;
};

const FacebookButton = ({ url, title }: SocialShareProps) => (
  <FacebookShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--facebook'])} aria-label='Share onFacebook'>
      <IconBrandFacebook />
    </div>
  </FacebookShareButton>
);

const InstagramButton = () => (
  <div className={clsx(style.button, style['button--instagram'])} aria-label='Share on Instagram'>
    <IconBrandInstagram />
  </div>
);

const MessengerButton = () => (
  <div className={clsx(style.button, style['button--messenger'])} aria-label='Share on Messenger'>
    <IconBrandMessenger />
  </div>
);

const LinkedinButton = ({ url, title, description, source }: SocialShareProps) => (
  <LinkedinShareButton url={url} title={title} summary={description} source={source}>
    <div className={clsx(style.button, style['button--linkedin'])} aria-label='Share on Linkedin'>
      <IconBrandLinkedin />
    </div>
  </LinkedinShareButton>
);

const TwitterButton = ({ url, title }: SocialShareProps) => (
  <TwitterShareButton url={url} title={title}>
    <div
      className={clsx(style.button, style['button--twitter'])}
      aria-label='Share on X (Formerly Twitter)'
    >
      <IconBrandX />
    </div>
  </TwitterShareButton>
);

const WhatsappButton = ({ url, title }: SocialShareProps) => (
  <WhatsappShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--whatsapp'])} aria-label='Share on Whatsapp'>
      <IconBrandWhatsapp />
    </div>
  </WhatsappShareButton>
);

const TelegramButton = ({ url, title }: SocialShareProps) => (
  <TelegramShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--telegram'])} aria-label='Share on Telegram'>
      <IconBrandTelegram />
    </div>
  </TelegramShareButton>
);

const PinterestButton = ({ url, title, pinterestImage }: SocialShareProps) => (
  <PinterestShareButton url={url} title={title} media={pinterestImage as string}>
    <div className={clsx(style.button, style['button--pinterest'])} aria-label='Share on Pinterest'>
      <IconBrandPinterest />
    </div>
  </PinterestShareButton>
);

const RedditButton = ({ url, title }: SocialShareProps) => (
  <RedditShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--reddit'])} aria-label='Share on Reddit'>
      <IconBrandReddit />
    </div>
  </RedditShareButton>
);

const TumblrButton = ({ url, title, caption }: SocialShareProps) => (
  <TumblrShareButton url={url} title={title} caption={caption}>
    <div className={clsx(style.button, style['button--tumblr'])} aria-label='Share on Tumblr'>
      <IconBrandTumblr />
    </div>
  </TumblrShareButton>
);

const VkButton = ({ url, title }: SocialShareProps) => (
  <VKShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--vk'])} aria-label='Share on VK'>
      <IconBrandVk />
    </div>
  </VKShareButton>
);

const LineButton = ({ url, title }: SocialShareProps) => (
  <LineShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--line'])} aria-label='Share on Line'>
      <IconBrandLine />
    </div>
  </LineShareButton>
);

const WeiboButton = ({ url, title }: SocialShareProps) => (
  <WeiboShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--weibo'])} aria-label='Share on Weibo'>
      <IconBrandWeibo />
    </div>
  </WeiboShareButton>
);

const PocketButton = ({ url, title }: SocialShareProps) => (
  <PocketShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--pocket'])} aria-label='Share on Pocket'>
      <IconBrandPocket />
    </div>
  </PocketShareButton>
);

const BlueskyButton = ({ url, title }: SocialShareProps) => (
  <BlueskyShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--bluesky'])} aria-label='Share on Bluesky'>
      <IconBrandBluesky />
    </div>
  </BlueskyShareButton>
);

const ThreadsButton = ({ url, title }: SocialShareProps) => (
  <ThreadsShareButton url={url} title={title}>
    <div className={clsx(style.button, style['button--threads'])} aria-label='Share on Threads'>
      <IconBrandThreads />
    </div>
  </ThreadsShareButton>
);

const EmailButton = ({ url, title, description }: SocialShareProps) => (
  <EmailShareButton url={url} subject={title} body={description}>
    <div className={style.button} aria-label='Share via Email'>
      <IconMail />
    </div>
  </EmailShareButton>
);

export {
  FacebookButton,
  InstagramButton,
  MessengerButton,
  LinkedinButton,
  TwitterButton,
  WhatsappButton,
  TelegramButton,
  PinterestButton,
  RedditButton,
  TumblrButton,
  VkButton,
  LineButton,
  WeiboButton,
  PocketButton,
  BlueskyButton,
  ThreadsButton,
  EmailButton,
};
