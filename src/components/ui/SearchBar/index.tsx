'use client';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FormField, SearchField } from '../FormFields';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };
  return (
    <FormField onSubmit={handleSubmit}>
      <SearchField value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type='submit'>Search</button>
    </FormField>
  );
};

export default SearchBar;
