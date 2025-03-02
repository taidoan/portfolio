import type { NumberField } from 'payload';

export const numberOfProjects = () => {
  const noOfProjects: NumberField = {
    name: 'numberOfProjects',
    type: 'number',
    label: 'Number of Projects',
    min: 4,
    max: 12,
    admin: {
      position: 'sidebar',
      description: 'The number of projects to show in the archive before pagination',
      condition: (data) => {
        if (data.slug === 'projects') {
          return true;
        }
        return false;
      },
    },
  };
  return [noOfProjects];
};
