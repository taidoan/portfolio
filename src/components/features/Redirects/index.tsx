import type { Page, Project, Service } from '@/payload-types';
import { getCachedRedirects } from '@/lib/utilities/getRedirects';
import { getCachedDocument } from '@/lib/utilities/getDoc';
import { notFound, redirect } from 'next/navigation';

export type RedirectsProps = {
  disableNotFound?: boolean;
  url: string;
};

export const Redirects = async ({ disableNotFound, url }: RedirectsProps) => {
  const redirects = await getCachedRedirects()();
  const redirectItem = redirects.find((item) => item.from === url);

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url);
    }

    let redirectUrl: string;

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo;
      const id = redirectItem.to?.reference?.value;

      const document = (await getCachedDocument(collection, id)()) as Page | Project | Service;
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${document?.slug}`;
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`;
    }

    if (redirectUrl) redirect(redirectUrl);
  }

  if (disableNotFound) return null;
  notFound();
};
