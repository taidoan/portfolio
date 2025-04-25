import type { ContentBlockProps } from '@/payload-types';

import { Card, CardBody } from '@components/ui/Card';
import RichText from '@components/ui/RichText';

export type Props = {
  className?: string;
  container?: 'boxed' | 'none';
} & ContentBlockProps;

export const ContentBlock = ({ className, container, content, boxedPadding }: Props) => {
  const contentToReturn = <RichText data={content} />;

  if (container === 'boxed') {
    return (
      <Card className={className}>
        <CardBody padding={boxedPadding}>{contentToReturn}</CardBody>
      </Card>
    );
  }

  return <div className={className}>{contentToReturn}</div>;
};
