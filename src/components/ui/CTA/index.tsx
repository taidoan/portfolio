import type { LinksBlockProps } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { headingConverter } from '../RichText/converters/heading';
import { getHref } from '@/lib/utilities/getHref';
import { clsx } from 'clsx';
import { RichText } from '@components/ui/RichText';
import { Button } from '../Button';
import { Alert, AlertTitle } from '../Alert';

export type CTAProps = {
  className?: string;
  content: DefaultTypedEditorState;
  link: LinksBlockProps['link'];
  background:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'gradient-light'
    | 'gradient-primary'
    | 'gradient-secondary'
    | 'gradient-accent'
    | 'none';
};

export const CTA = ({ className, content, link, background = 'primary' }: CTAProps) => {
  const href = link ? getHref(link) : null;
  const ctaClasses = clsx('section__boxed-layout', 'section__boxed-layout--left', className, {
    [`bg--${background}`]: background && background !== 'none',
  });

  if (content && href) {
    return (
      <section className={ctaClasses}>
        <RichText data={content} converters={headingConverter} />
        <Button href={href}>{link.label}</Button>
      </section>
    );
  }

  return (
    <Alert severity='error'>
      <AlertTitle>Missing CTA Content</AlertTitle>
      <p>The CTA content is missing. Please check the content and try again.</p>
    </Alert>
  );
};
