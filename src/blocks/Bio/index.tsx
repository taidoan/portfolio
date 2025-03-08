import type { BioBlockProps } from '@/payload-types';
import { Bio } from '@/components/ui/Bio';
import { IconSchool, IconMapPin, IconMail } from '@tabler/icons-react';

export type Props = {
  className?: string;
} & BioBlockProps;

const iconMap = {
  email: <IconMail stroke={2} size={32} />,
  location: <IconMapPin stroke={2} size={32} />,
  education: <IconSchool stroke={2} size={32} />,
} as const;

const getIcon = (label: string | undefined | null) => {
  return iconMap[label as keyof typeof iconMap] || null;
};

export const BioBlock = ({ items, className }: Props) => {
  const bioItems = items?.map((item, index) => {
    const { label, value, link } = item;
    return {
      label: label,
      value: value,
      icon: getIcon(label),
      ...(link &&
        Object.keys(link).length > 0 && {
          link: {
            href: link.url || '',
            target: link.newTab ? '_blank' : undefined,
            title: link.label,
            label: link.label || '',
          },
        }),
      id: index,
    };
  });

  return (
    <div className={className}>
      <Bio items={bioItems} />
    </div>
  );
};
