import type { ContactMethodsBlockProps } from '@/payload-types';
import { ContactMethodsList, ContactPlatform } from '@/components/ui/ContactMethods';

export const ContactMethodsBlock = ({ contactMethods = [] }: ContactMethodsBlockProps) => {
  const contactMethodProps = contactMethods?.reduce(
    (acc, method) => {
      const platforms = Array.isArray(method.platform) ? method.platform : [method.platform];

      platforms.forEach((platform: ContactPlatform) => {
        acc[platform] = true;
        if (method.link) acc[`${platform}Link`] = method.link;
        if (method.label) acc[`${platform}Label`] = method.label;
      });

      return acc;
    },
    {} as Record<string, boolean | string>,
  );

  return (
    <div>
      <ContactMethodsList {...contactMethodProps} />
    </div>
  );
};
