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
 * PDFMedia component embeds a PDF file into a web page.
 *
 * @param {PDFMediaProps} props - The component props
 * @param {string|null|undefined} props.src - Source URL of the PDF file
 * @param {string|number} [props.width=100%] - Width of the embedded PDF
 * @param {string|number} [props.height=600px] - Height of the embedded PDF
 * @param {React.CSSProperties} [props.style] - Additional CSS styles
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} An iframe with the embedded PDF viewer
 * @throws Will render an error Alert if src is falsy
 *
 * @example
 * // Basic usage
 * <PDFMedia src="example.pdf" />
 *
 * @example
 * // With custom dimensions
 * <PDFMedia
 *   src="https://example.com/document.pdf"
 *   width="800px"
 *   height="500px"
 * />
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
