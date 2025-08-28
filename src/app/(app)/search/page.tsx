import type { Metadata } from 'next';
import type { Media as MediaType } from '@/payload-types';

import clsx from 'clsx';

import heroStyle from '@blocks/Hero/Archive/style.module.scss';
import { AUTHOR_NAME, SITE_NAME } from '@lib/constants';
import { querySearch } from '@/lib/utilities/queries/querySearch';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { getCachedPageID } from '@/lib/utilities/getPageID';
import { truncate } from '@/lib/utilities/truncate';

import SearchBar from '@/components/ui/SearchBar';
import Sidebar from '@/components/layout/Sidebar';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Carousel } from '@/components/ui/Carousel';
import { Card, CardBody, CardContent, CardImage, CardTitle } from '@/components/ui/Card';
import { PaginationSearch } from './pagination';
import { Button } from '@/components/ui/Button';

export type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined | number | number[] }>;
};

type SearchResult = {
  doc: {
    relationTo: string;
  };
  title: string;
  description: string;
  url: string;
  type: string;
  tools: string;
  tags: string[];
  content: string;
  categories: string[];
  thumbnail?: MediaType;
};

type SearchResponse = {
  docs: SearchResult[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

const SearchPage = async ({ searchParams }: Props) => {
  const params = await Promise.resolve(searchParams);
  const query = params.query || '';
  const collection = params.collection || '';
  const perPage = params.perPage || 6;
  const page = params.page || 1;

  const BASE_BREADCRUMBS = [
    {
      id: await getCachedPageID('home'),
      title: 'Home',
      slug: '',
    },
    {
      title: 'Search',
      slug: 'search',
    },
  ];

  const searchResponse: SearchResponse = query
    ? ((await querySearch(
        query as string,
        collection as string,
        page as number,
        perPage as number,
      )) ?? {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })
    : {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      };

  const searchResults = searchResponse.docs || [];
  const sidebarData = await getCachedGlobal('sidebar', 2)();

  const breadcrumbs = query
    ? [...BASE_BREADCRUMBS, { title: `Query: ${query}` }]
    : BASE_BREADCRUMBS;

  const hasResults = searchResults.length > 0;
  const resultsText = hasResults ? (
    <p>
      Great news! We&apos;ve found <strong>{searchResults.length}</strong> result
      {searchResults.length > 1 ? 's' : ''} matching your search for{' '}
      <span className='highlighted-text'>{query}</span>. Take a look at the options below to find
      the content that best suits your needs.
    </p>
  ) : (
    <p>
      Oops, we couldn&apos;t find anything matching your search for{' '}
      <span className='highlighted-text'>{query}</span>. Try broadening your search or check back
      later for more content.
    </p>
  );

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
              breadcrumbs={breadcrumbs}
              container='outlined'
              outlineColor='urban-steel'
              className='search-page__breadcrumbs'
            />
            {resultsText}
            {collection === 'tags' && (
              <Button
                href='/tags'
                color='secondary'
                hoverColor='accent'
                className={clsx('hero__cta', heroStyle.cta)}
              >
                View All Tags
              </Button>
            )}
          </>
        ) : (
          <div className='search-page__hero'>
            <div>
              <h2 className='section-heading'>Let&apos;s Find Stuff</h2>
              <h1>Search</h1>
              <Breadcrumbs
                breadcrumbs={breadcrumbs}
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
          <section className={clsx('section__wrapper', 'search-page__wrapper')}>
            <div className={clsx('col-span-11', 'search-page__main')}>
              {hasResults ? (
                <>
                  <Carousel
                    disableAt={'(min-width: 64em)'}
                    pagination
                    paginationType='progress'
                    paginationColor='slate'
                    showPaginationCounter
                    buttonNavigation
                    keyboardControls
                    autoHeight
                    wrapperClassName='search-page__content'
                    className='search-page__content-container'
                  >
                    {searchResults.map((item, index) => (
                      <Card
                        key={index}
                        kind='archive'
                        href={item.url}
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        data={item as any}
                        relation={item?.doc.relationTo}
                      >
                        <CardBody padding='small'>
                          <CardImage align='left' borderRadius='all' />
                          <CardContent>
                            <CardTitle>{item.title}</CardTitle>
                            <p>{truncate(item.description, 220)}</p>
                          </CardContent>
                        </CardBody>
                      </Card>
                    ))}
                  </Carousel>
                  <PaginationSearch
                    currentPage={page as number}
                    totalPages={searchResponse.totalPages}
                    query={query as string}
                    collection={collection as string}
                    perPage={perPage as number}
                  />
                </>
              ) : (
                <Alert severity='warning'>
                  <AlertTitle>No results found</AlertTitle>
                  <p>No search results were found for &quot;{query}&quot;.</p>
                </Alert>
              )}
            </div>
            <Sidebar data={sidebarData} className={clsx('col-span-5', 'search-page__sidebar')} />
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
