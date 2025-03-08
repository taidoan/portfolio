'use client';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { IconCircleChevronDownFilled } from '@tabler/icons-react';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import clsx from 'clsx';
import style from './style.module.scss';

export type AccordionItemProps = {
  title: string | undefined | null;
  content?: string | React.ReactNode | null;
  id: string | undefined | null;
};

export type AccordionProps = {
  className?: string | undefined;
  items: AccordionItemProps[] | null;
  container?: 'card' | 'none' | null;
  indexCounter?: 'true' | 'false' | null;
};

/**
 * Accordion component renders a list of items with a title and content.
 * @param {AccordionProps} props - Accordion component props
 * @returns {React.ReactElement} Accordion component
 * @example
 * <Accordion items={items} container='card' indexCounter />
 * <Accordion items={items} container='none' indexCounter />
 * <Accordion items={items} container='card' />
 * <Accordion items={items} container='none' />
 * <Accordion items={items} />
 * @see {@link https://www.w3.org/TR/wai-aria-practices-1.2/#accordion Accordion WAI-ARIA Design Pattern}
 */

export const Accordion = ({
  className,
  items,
  container = 'none',
  indexCounter = 'false',
}: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!items || items.length === 0) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>No accordion items were found.
      </Alert>
    );
  }

  const toggleSelection = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const accordionClasses = clsx(style.accordion, {
    [style['accordion--card']]: container === 'card',
  });

  const accordionContent = items?.map((item, index) => {
    const activeHeader = activeIndex === index;

    return (
      <div key={index} className={style.accordion__item}>
        <div
          className={style.accordion__header}
          data-testid='accordion-header'
          onClick={() => toggleSelection(index)}
        >
          <button
            className={style.accordion__title}
            aria-label={`Open the content for ${item.title}`}
            aria-controls={item.id || undefined}
            data-active={activeHeader}
          >
            {indexCounter === 'true' && (
              <span
                className={style.accordion__counter}
                data-active={activeHeader}
                data-testid={`accordion-counter-${index}`}
              >
                {index + 1}
              </span>
            )}
            {item.title}
          </button>
          <button
            className={style.accordion__icon}
            aria-label={`Open the content for ${item.title}`}
            aria-controls={item.id || undefined}
            data-active={activeHeader}
          >
            <IconCircleChevronDownFilled />
          </button>
        </div>
        <div
          id={item.id || undefined}
          className={style.accordion__content}
          aria-expanded={activeHeader}
          data-testid='accordion-content'
        >
          {item.content}
        </div>
      </div>
    );
  });

  if (container === 'card') {
    return (
      <Card className={className} data-testid='accordion-card'>
        <CardBody className={accordionClasses}>{accordionContent}</CardBody>
      </Card>
    );
  } else {
    return (
      <div className={className} data-testid='accordion'>
        <div className={accordionClasses}>{accordionContent}</div>
      </div>
    );
  }
};
