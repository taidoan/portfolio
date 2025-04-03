'use client';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FormField, SearchField } from '../FormFields';

const SearchBar = ({
  className,
  submitPosition,
  inputClassName,
}: {
  className?: string;
  submitPosition?: 'inside' | 'outside';
  inputClassName?: string;
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };
  return (
    <FormField onSubmit={handleSubmit} className={className}>
      <SearchField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search something...'
        submitPosition={submitPosition}
        className={inputClassName}
      />
    </FormField>
  );
};

export default SearchBar;
