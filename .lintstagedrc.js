import { relative } from 'path';

const buildEslintCommand = (filenames) => {
  // Filter only files in scripts/ and src/
  const filteredFiles = filenames.filter((f) => f.startsWith('scripts/') || f.startsWith('src/'));

  if (filteredFiles.length === 0) return [];

  return [
    `next lint --fix --file ${filteredFiles.map((f) => relative(process.cwd(), f)).join(' --file ')}`,
  ];
};

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, () => 'tsc --noEmit'],
  '*.{js,jsx,ts,tsx,css,md,json}': ['prettier --write'],
};
