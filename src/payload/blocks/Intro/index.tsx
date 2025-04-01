import type { IntroBlockProps } from '@/payload-types';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { RichText } from '@components/ui/RichText';
import clsx from 'clsx';

export type Props = {
  className?: string;
} & IntroBlockProps;

export const IntroBlock = ({ introContent, className, blockName, textAlign }: Props) => {
  const introClasses = clsx('section__intro', className, blockName, {
    [`text-align__${textAlign}`]: textAlign,
  });

  return introContent ? (
    <div className={introClasses}>
      <RichText converters={headingConverter} data={introContent} />
    </div>
  ) : null;
};
