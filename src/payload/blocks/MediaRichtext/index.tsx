import type { MediaRichtextBlockProps } from '@/payload-types';
import { BaseMediaBlock } from '../Media/base';
import style from './../Media/style.module.scss';
import clsx from 'clsx';

export type Props = {
  className?: string | undefined | null;
} & MediaRichtextBlockProps;

export const MediaRichTextBlock = (props: Props) => {
  const richTextProps = {
    ...props,
    className: clsx(style.container, props.className),
  };

  return <BaseMediaBlock {...richTextProps} />;
};
