'use client';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg'
      style={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'flex-start' }}
    >
      <label className='block mb-2 font-medium'>Search</label>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-2 border rounded mb-4'
      />

      <label className='block mb-2 font-medium'>Email</label>
      <input type='email' className='w-full p-2 border rounded mb-4' />

      <label className='block mb-2 font-medium'>Password</label>
      <input type='password' className='w-full p-2 border rounded mb-4' />

      <label className='block mb-2 font-medium'>Number</label>
      <input type='number' className='w-full p-2 border rounded mb-4' />

      <label className='block mb-2 font-medium'>Dropdown</label>
      <select className='w-full p-2 border rounded mb-4'>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>

      <label className='block mb-2 font-medium'>Textarea</label>
      <textarea className='w-full p-2 border rounded mb-4' rows={4}></textarea>

      <label className='block mb-2 font-medium'>Radio Buttons</label>
      <div className='flex gap-4 mb-4'>
        <label className='flex items-center'>
          <input type='radio' name='radio' className='mr-2' /> Option 1
        </label>
        <label className='flex items-center'>
          <input type='radio' name='radio' className='mr-2' /> Option 2
        </label>
      </div>

      <label className='block mb-2 font-medium'>Checkboxes</label>
      <div className='flex gap-4 mb-4'>
        <label className='flex items-center'>
          <input type='checkbox' className='mr-2' /> Checkbox 1
        </label>
        <label className='flex items-center'>
          <input type='checkbox' className='mr-2' /> Checkbox 2
        </label>
      </div>

      <label className='block mb-2 font-medium'>Range Slider</label>
      <input type='range' className='w-full mb-4' />

      <label className='block mb-2 font-medium'>File Upload</label>
      <input type='file' className='w-full p-2 border rounded mb-4' />

      <label className='block mb-2 font-medium'>Color Picker</label>
      <input type='color' className='w-full mb-4' />

      <div className='flex gap-4 mt-4'>
        <button type='submit'>Search</button>
        <button type='reset' className='bg-gray-300 px-4 py-2 rounded'>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
