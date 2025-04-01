'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { querySearch } from '@/lib/utilities/queries/querySearch';
import SearchBar from '@/components/ui/SearchBar';
import { Spinner } from '@/components/ui/Spinner';
import { Alert, AlertTitle } from '@/components/ui/Alert';

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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      const results = await querySearch(query);
      setSearchResults(results || []);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <section className='section'>
      <SearchBar />

      {query && (
        <div className='mt-6'>
          <h2 className='text-xl font-bold'>Search Results for &quot;{query}&quot;</h2>

          {loading ? (
            <Spinner />
          ) : searchResults.length > 0 ? (
            <ul className='mt-4 space-y-4'>
              {searchResults.map((item, index) => (
                <li key={index} className='border-b pb-2'>
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p className='text-gray-600'>{item.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Alert severity='warning'>
              <AlertTitle>No results found</AlertTitle>
              <p>No search results were found for &quot;{query}&quot;.</p>
            </Alert>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchPage;
