import type { Metadata } from 'next';
import type { PageProps } from '.next/types/app/(app)/layout';

import clsx from 'clsx';

import heroStyle from '@blocks/Hero/Archive/style.module.scss';
import { AUTHOR_NAME, SITE_NAME } from '@lib/constants';
import { querySearch } from '@/lib/utilities/queries/querySearch';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';

import SearchBar from '@/components/ui/SearchBar';
import Sidebar from '@/components/layout/Sidebar';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type SearchResult = {
  title: string;
  description: string;
  url: string;
  type: string;
  tools: string;
  tags: string[];
  content: string;
  categories: string[];
};

const SearchPage = async ({ searchParams }: PageProps) => {
  const params = await Promise.resolve(searchParams);
  const query = params.query || '';
  const searchResults: SearchResult[] = query ? await querySearch(query) : [];
  const sidebarData = await getCachedGlobal('sidebar', 2)();

  const queryTerm = <span className='highlighted-text'>{query}</span>;
  const initialBreadcrumbs = [
    {
      id: '67c1bd0b9fb50c2e22c139f5',
      title: 'Home',
      slug: '',
    },
    {
      title: 'Search',
      slug: 'search',
    },
  ];

  const resultBreadcrumbs = [
    ...initialBreadcrumbs,
    {
      title: `Query: ${query}`,
    },
  ];

  return (
    <>
      <section className={clsx(heroStyle.hero, 'section')}>
        {query ? (
          <>
            <h2 className='section-heading'>
              Search Result{searchResults.length > 1 ? 's' : ''} For
            </h2>
            <h1>{query}</h1>
            <Breadcrumbs
              breadcrumbs={resultBreadcrumbs}
              container='outlined'
              outlineColor='urban-steel'
              className='search-page__breadcrumbs'
            />
            {searchResults.length > 0 ? (
              <p>
                Great news! We&apos;ve found <strong>{searchResults.length}</strong> result
                {searchResults.length > 1 ? 's' : ''} matching your search for {queryTerm}. Take a
                look at the options below to find the content that best suits your needs.
              </p>
            ) : (
              <p>
                Oops, we couldn&apos;t find anything matching your search for {queryTerm}. Try
                broadening your search or check back later for more content.
              </p>
            )}
          </>
        ) : (
          <div className='search-page__hero'>
            <div>
              <h2 className='section-heading'>Let&apos;s Find Stuff</h2>
              <h1>Search</h1>
              <Breadcrumbs
                breadcrumbs={initialBreadcrumbs}
                container='outlined'
                outlineColor='urban-steel'
                className='search-page__breadcrumbs'
              />
              <p>
                Enter a keyword or topic in the search bar below, and we&apos;ll help you find
                exactly what you&apos;re looking for. Whether it&apos;s articles, resources, or
                something else, we&apos;re here to help you explore!
              </p>
            </div>
            <SearchBar submitPosition='outside' className='search-page__search-bar' />
          </div>
        )}
      </section>

      {query && (
        <section className={clsx('section', 'bg--gradient-grey', 'full-width')}>
          <section className={clsx('section__wrapper')}>
            <div className={'col-span-11'}>
              {query ? (
                searchResults.length > 0 ? (
                  <ul className='mt-4 space-y-4'>
                    {searchResults.map((item, index) => (
                      <li key={index} className='border-b pb-2'>
                        <h3 className='font-semibold'>{item.title}</h3>
                        <p className='text-gray-600'>{item.description}</p>
                        <span>{item.url}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Alert severity='warning'>
                    <AlertTitle>No results found</AlertTitle>
                    <p>No search results were found for &quot;{query}&quot;.</p>
                  </Alert>
                )
              ) : (
                <Alert severity='info'>
                  <AlertTitle>No search query</AlertTitle>
                  <p>Please enter a search query into the search bar.</p>
                </Alert>
              )}
            </div>
            <Sidebar data={sidebarData} className='col-span-5' />
          </section>
        </section>
      )}
    </>
  );
};

export default SearchPage;

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}): Promise<Metadata> => {
  const params = await searchParams;
  const query = params?.query ?? '';

  return {
    title: query ? `Search Results for "${query}" | ${SITE_NAME}` : `Search | ${SITE_NAME}`,
    description: query
      ? `View search results for "${query}" on ${AUTHOR_NAME}'s portfolio. Find relevant articles, resources, and more.`
      : `Use the search function to explore content on ${AUTHOR_NAME}'s portfolio.`,
  };
};
