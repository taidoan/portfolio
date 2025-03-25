import { Alert, AlertTitle } from '@/components/ui/Alert';
import { getCDNURL } from '@/lib/utilities/getURLs';
import clsx from 'clsx';
import s from './../style.module.scss';

const urlEndpoint = getCDNURL();

export type PDFMediaProps = {
  src: string | null | undefined;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
};

/**
 * PDFMedia component is a resuable component that embeds a PDF file into a web page.
 * @param src - The URL or path to the PDF file.
 * @param width - The width of the embedded PDF.
 * @param height - The height of the embedded PDF.
 * @param style - Additional CSS styles to apply to the embedded PDF.
 * @param className - Additional CSS classes to apply to the embedded PDF.
 * @returns A React component that renders an embedded PDF file.
 * @example
 * <PDFMedia src='example.pdf' width='100%' height='600px' />
 */

export const PDFMedia = ({
  src,
  width = '100%',
  height = '600px',
  style,
  className,
}: PDFMediaProps) => {
  if (!src) {
    return (
      <Alert severity='error'>
        <AlertTitle>PDF Media Error</AlertTitle>
        <p>The PDFMedia component requires a valid `src` prop.</p>
      </Alert>
    );
  }

  let srcToUse = src;

  if (typeof src === 'string' && src.startsWith('http') && !src.includes(urlEndpoint)) {
    srcToUse = src;
  } else {
    srcToUse = `${urlEndpoint}/${src}`;
  }

  return (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(srcToUse)}&embedded=true`}
      width={width}
      height={height}
      style={style}
      className={clsx(s.iframePDF, className)}
      content='application/pdf'
      title='PDF Viewer'
      loading='lazy'
      allow='fullscreen'
    />
  );
};
