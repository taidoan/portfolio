import type { AccordionBlockProps } from '@/payload-types';
import type { AccordionItemProps } from '@/components/ui/Accordion';
import { Accordion } from '@/components/ui/Accordion';
import { RichText } from '@/components/ui/RichText';

export type Props = {
  className?: string;
} & AccordionBlockProps;

export const AccordionBlock = ({ className, accordionContent, container, indexCounter }: Props) => {
  const accordionItems: AccordionItemProps[] =
    accordionContent?.map((item) => {
      return {
        title: item.title,
        content: <RichText data={item.content} />,
        id: item.id,
      };
    }) || [];

  return (
    <Accordion
      className={className}
      items={accordionItems}
      container={container}
      indexCounter={indexCounter}
    />
  );
};
