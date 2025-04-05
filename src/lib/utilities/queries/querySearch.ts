import qs from 'qs';

export const querySearch = async (
  query: string,
  collection?: string,
  page: number = 1,
  perPage: number = 6,
) => {
  if (!query.trim()) {
    console.log('Please provide a search query');
    return;
  }

  try {
    let queryObj;

    const queryAll = {
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
            'tags.name': {
              like: query,
            },
          },
          {
            'categories.title': {
              like: query,
            },
          },
        ],
      },
      page,
      limit: perPage,
    };

    const queryTags = {
      where: {
        or: [
          {
            'tags.name': {
              like: query,
            },
          },
        ],
      },
      page,
      limit: perPage,
    };

    const queryCategories = {
      where: {
        or: [
          {
            'categories.title': {
              like: query,
            },
          },
        ],
      },
      page,
      limit: perPage,
    };

    if (collection === 'tags') {
      queryObj = queryTags;
    } else if (collection === 'categories') {
      queryObj = queryCategories;
    } else {
      queryObj = queryAll;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`,
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    return {
      docs: data.docs || [],
      totalDocs: data.totalDocs || 0,
      totalPages: data.totalPages || 0,
      page: data.page || page,
      hasPrevPage: data.hasPrevPage || false,
      hasNextPage: data.hasNextPage || false,
    };
  } catch (error) {
    console.error('Error performing search:', error);
  }
};
