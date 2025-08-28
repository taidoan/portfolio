import type { ColumnsBlockProps } from '@/payload-types';
import { RichText } from '@/components/ui/RichText';

export const ColumnsBlock = ({ columns }: ColumnsBlockProps) => {
  return (
    <div data-columns={columns?.length}>
      {columns?.map((column, index) => (
        <div key={index}>{column.content && <RichText data={column.content} />}</div>
      ))}
    </div>
  );
};
