import type { LinksBlockProps } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { headingConverter } from '../../ui/RichText/converters/heading';
import { getHref } from '@/lib/utilities/getHref';
import { clsx } from 'clsx';
import { RichText } from '@components/ui/RichText';
import { Button } from '../../ui/Button';
import { Alert, AlertTitle } from '../../ui/Alert';

type ColorType =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'light'
  | 'gradient-primary'
  | 'gradient-secondary'
  | 'gradient-accent'
  | 'gradient-light'
  | 'gradient-grey'
  | 'none';
type VariantType = 'outlined' | 'outlined-thick' | 'fill';

export type CTAProps = {
  className?: string;
  content: DefaultTypedEditorState;
  link: LinksBlockProps['link'];
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'circle';
  color?: ColorType;
  variant?: VariantType;
};

export const CTA = ({
  className,
  content,
  link,
  color = 'primary',
  borderRadius = 'medium',
  variant = 'fill',
}: CTAProps) => {
  const href = link ? getHref(link) : null;
  const ctaClasses = clsx(
    'section',
    'section__boxed-layout',
    'section__boxed-layout--left',
    className,
    {
      [`border-radius--${borderRadius}`]: borderRadius && borderRadius !== 'none',
      [`variant--${variant}`]: variant,
    },
  );

  const bgColors: Record<string, string> = {
    'gradient-primary': `linear-gradient(97.51deg, rgba(0, 0, 0, 0) 3.06%, rgba(0, 0, 0, 0.21) 93.46%),
    var(--clr-primary-400)`,
    'gradient-secondary': `linear-gradient(97.51deg, rgba(0, 0, 0, 0) 3.06%, rgba(0, 0, 0, 0.21) 93.46%),
    var(--clr-secondary-400)`,
    'gradient-accent': `linear-gradient(97.51deg, rgba(0, 0, 0, 0) 3.06%, rgba(0, 0, 0, 0.21) 93.46%),
    var(--clr-accent-400)`,
    'gradient-light': `linear-gradient(149.32deg, var(--clr-concrete-400) 0%, #f1f1ef 100%), var(--clr-gallery-400)`,
    'gradient-grey': `linear-gradient(180deg, var(--clr-concrete-400) 0%, var(--clr-ivory-400) 100%)`,
  };

  const getBgColor = (color: ColorType): string => {
    return color in bgColors ? bgColors[color] : `var(--clr-${color}-400)`;
  };

  const getTextColor = (variant: VariantType, color: ColorType): string => {
    if (variant === 'outlined' || variant === 'outlined-thick') {
      if (color === 'primary') return 'var(--clr-primary-400)';
      if (color === 'accent') return 'var(--clr-accent-550)';
      return 'var(--clr-secondary-400)';
    }
    if (
      variant === 'fill' &&
      ['primary', 'secondary', 'gradient-primary', 'gradient-secondary'].includes(color as string)
    ) {
      return 'var(--clr-light-400)';
    }
    return 'var(--clr-secondary-400)';
  };

  const bgColor = getBgColor(color as ColorType);
  const textColor = getTextColor(variant as VariantType, color as ColorType);

  const ctaStyles: React.CSSProperties & { [key: string]: string } = {
    '--clr': bgColor,
    '--text-clr': textColor,
  };

  const buttonProps = {
    color: link.color || undefined,
    shadow: link.buttonShadow || undefined,
    className: link.className || undefined,
    variant: link.variant || undefined,
    hoverColor: link.hoverColor || undefined,
  };

  if (content && href) {
    return (
      <section className={ctaClasses} style={ctaStyles} data-bg-clr={color} data-variant={variant}>
        <RichText data={content} converters={headingConverter} />
        <Button href={href} {...buttonProps}>
          {link.label}
        </Button>
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
