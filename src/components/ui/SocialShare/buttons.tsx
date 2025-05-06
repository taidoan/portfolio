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

const FacebookButton = () => (
  <div className={clsx(style.button, style['button--facebook'])} aria-label='Share onFacebook'>
    <IconBrandFacebook />
  </div>
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

const LinkedinButton = () => (
  <div className={clsx(style.button, style['button--linkedin'])} aria-label='Share on Linkedin'>
    <IconBrandLinkedin />
  </div>
);

const TwitterButton = () => (
  <div
    className={clsx(style.button, style['button--twitter'])}
    aria-label='Share on X (Formerly Twitter)'
  >
    <IconBrandX />
  </div>
);

const WhatsappButton = () => (
  <div className={clsx(style.button, style['button--whatsapp'])} aria-label='Share on Whatsapp'>
    <IconBrandWhatsapp />
  </div>
);

const TelegramButton = () => (
  <div className={clsx(style.button, style['button--telegram'])} aria-label='Share on Telegram'>
    <IconBrandTelegram />
  </div>
);

const PinterestButton = () => (
  <div className={clsx(style.button, style['button--pinterest'])} aria-label='Share on Pinterest'>
    <IconBrandPinterest />
  </div>
);

const RedditButton = () => (
  <div className={clsx(style.button, style['button--reddit'])} aria-label='Share on Reddit'>
    <IconBrandReddit />
  </div>
);

const TumblrButton = () => (
  <div className={clsx(style.button, style['button--tumblr'])} aria-label='Share on Tumblr'>
    <IconBrandTumblr />
  </div>
);

const VkButton = () => (
  <div className={clsx(style.button, style['button--vk'])} aria-label='Share on VK'>
    <IconBrandVk />
  </div>
);

const LineButton = () => (
  <div className={clsx(style.button, style['button--line'])} aria-label='Share on Line'>
    <IconBrandLine />
  </div>
);

const WeiboButton = () => (
  <div className={clsx(style.button, style['button--weibo'])} aria-label='Share on Weibo'>
    <IconBrandWeibo />
  </div>
);

const PocketButton = () => (
  <div className={clsx(style.button, style['button--pocket'])} aria-label='Share on Pocket'>
    <IconBrandPocket />
  </div>
);

const BlueskyButton = () => (
  <div className={clsx(style.button, style['button--bluesky'])} aria-label='Share on Bluesky'>
    <IconBrandBluesky />
  </div>
);

const ThreadsButton = () => (
  <div className={clsx(style.button, style['button--threads'])} aria-label='Share on Threads'>
    <IconBrandThreads />
  </div>
);

const EmailButton = () => (
  <div className={style.button} aria-label='Share via Email'>
    <IconMail />
  </div>
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
