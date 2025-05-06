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
  <button className={clsx(style.button, style['button--facebook'])} aria-label='Share onFacebook'>
    <IconBrandFacebook />
  </button>
);

const InstagramButton = () => (
  <button
    className={clsx(style.button, style['button--instagram'])}
    aria-label='Share on Instagram'
  >
    <IconBrandInstagram />
  </button>
);

const MessengerButton = () => (
  <button
    className={clsx(style.button, style['button--messenger'])}
    aria-label='Share on Messenger'
  >
    <IconBrandMessenger />
  </button>
);

const LinkedinButton = () => (
  <button className={clsx(style.button, style['button--linkedin'])} aria-label='Share on Linkedin'>
    <IconBrandLinkedin />
  </button>
);

const TwitterButton = () => (
  <button
    className={clsx(style.button, style['button--twitter'])}
    aria-label='Share on X (Formerly Twitter)'
  >
    <IconBrandX />
  </button>
);

const WhatsappButton = () => (
  <button className={clsx(style.button, style['button--whatsapp'])} aria-label='Share on Whatsapp'>
    <IconBrandWhatsapp />
  </button>
);

const TelegramButton = () => (
  <button className={clsx(style.button, style['button--telegram'])} aria-label='Share on Telegram'>
    <IconBrandTelegram />
  </button>
);

const PinterestButton = () => (
  <button
    className={clsx(style.button, style['button--pinterest'])}
    aria-label='Share on Pinterest'
  >
    <IconBrandPinterest />
  </button>
);

const RedditButton = () => (
  <button className={clsx(style.button, style['button--reddit'])} aria-label='Share on Reddit'>
    <IconBrandReddit />
  </button>
);

const TumblrButton = () => (
  <button className={clsx(style.button, style['button--tumblr'])} aria-label='Share on Tumblr'>
    <IconBrandTumblr />
  </button>
);

const VkButton = () => (
  <button className={clsx(style.button, style['button--vk'])} aria-label='Share on VK'>
    <IconBrandVk />
  </button>
);

const LineButton = () => (
  <button className={clsx(style.button, style['button--line'])} aria-label='Share on Line'>
    <IconBrandLine />
  </button>
);

const WeiboButton = () => (
  <button className={clsx(style.button, style['button--weibo'])} aria-label='Share on Weibo'>
    <IconBrandWeibo />
  </button>
);

const PocketButton = () => (
  <button className={clsx(style.button, style['button--pocket'])} aria-label='Share on Pocket'>
    <IconBrandPocket />
  </button>
);

const BlueskyButton = () => (
  <button className={clsx(style.button, style['button--bluesky'])} aria-label='Share on Bluesky'>
    <IconBrandBluesky />
  </button>
);

const ThreadsButton = () => (
  <button className={clsx(style.button, style['button--threads'])} aria-label='Share on Threads'>
    <IconBrandThreads />
  </button>
);

const EmailButton = () => (
  <button className={style.button} aria-label='Share via Email'>
    <IconMail />
  </button>
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
