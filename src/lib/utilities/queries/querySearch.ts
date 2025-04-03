import qs from 'qs';

export const querySearch = async (query: string) => {
  if (!query.trim()) {
    console.log('Please provide a search query');
    return;
  }

  try {
    const queryObj = {
      where: {
        or: [
          {
            title: {
              like: query,
            },
          },
          {
            description: {
              like: query,
            },
          },
          {
            content: {
              like: query,
            },
          },
          {
            type: {
              like: query,
            },
          },
          {
            tools: {
              like: query,
            },
          },
          {
            tags: {
              like: query,
            },
          },
        ],
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`,
    );
    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error performing search:', error);
  }
};
