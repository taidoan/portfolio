import type { Metadata } from 'next';

import clsx from 'clsx';
import heroStyle from '@blocks/Hero/Archive/style.module.scss';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getCachedPageID } from '@/lib/utilities/getPageID';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';

import Sidebar from '@/components/layout/Sidebar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const TagsPage = async () => {
  const payload = await getPayload({ config: configPromise });
  const tags = await payload.find({
    collection: 'tags',
    depth: 2,
    limit: 50,
    overrideAccess: false,
    pagination: false,
    select: {
      name: true,
      relatedProjects: true,
      relatedPosts: true,
    },
  });

  const breadcrumbs = [
    {
      id: await getCachedPageID('home'),
      title: 'Home',
      slug: '',
    },
    {
      title: 'Tags',
      slug: 'tags',
    },
  ];

  const sidebarData = await getCachedGlobal('sidebar', 2)();

  return (
    <>
      <section className={clsx(heroStyle.hero, 'section')}>
        <h2 className='section-heading'>Browse All Tags</h2>
        <h1>Tags</h1>
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          container='outlined'
          outlineColor='urban-steel'
          className='search-page__breadcrumbs'
        />
        <p>
          These are all the tags that are available on this site. Click on a tag to see all the
          projects or posts that have been tagged with it.
        </p>
      </section>
      <section className={clsx('section', 'bg--gradient-grey', 'full-width')}>
        <section className={clsx('section__wrapper', 'tags__wrapper')}>
          <div className={clsx('col-span-11', 'tags__content')}>
            {tags.docs.map((tag) => {
              const relatedProjects = tag.relatedProjects?.docs || [];
              const relatedPosts = tag.relatedPosts?.docs || [];
              const totalRelated = relatedProjects.length + relatedPosts.length;

              console.log('Tag related projects', totalRelated);

              return (
                <div key={tag.id} className={clsx('tags__item')}>
                  <h3 className='sub-heading'>{tag.name}</h3>
                  {totalRelated > 0 && <span>{totalRelated}</span>}
                </div>
              );
            })}
          </div>
          <Sidebar data={sidebarData} className='col-span-5' />
        </section>
      </section>
    </>
  );
};

export default TagsPage;

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Tags',
    description: 'Browse all tags',
  };
};
