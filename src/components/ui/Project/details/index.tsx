import type { Project } from '@/payload-types';
import { Card, CardBody } from '@/components/ui/Card';
import { DetailsList, DetailsItem } from './components';
import Link from 'next/link';

import { formatDate } from '@/lib/utilities/formatDate';
import { fetchCategory } from '@/lib/utilities/fetchCategory';
import { getServerSideURL } from '@/lib/utilities/getURLs';

export type ProjectDetailsProps = {
  className?: string;
  data: Pick<Project, 'details' | 'categories'>;
};

/**
 * This component renders the project details section of a project page.
 * @param {ProjectDetailsProps} props - The props for the ProjectDetails component.
 * @returns {React.ReactElement} The rendered component.
 * @example
 * <ProjectDetails data={project} />
 */
export const ProjectDetails = async ({
  className,
  data,
}: ProjectDetailsProps): Promise<React.ReactElement> => {
  const { details, categories } = data;

  const safeCategories = Array.isArray(categories) ? categories : [];
  const categoryPromises = safeCategories.map((cat) =>
    typeof cat === 'string' ? fetchCategory(cat) : fetchCategory(cat.id),
  );
  const categoryResults = (await Promise.all(categoryPromises)).map((res) => res?.docs ?? []);

  return (
    <Card className={className}>
      <CardBody padding='small'>
        <DetailsList>
          {details?.date && (
            <DetailsItem key='date' type='date'>
              {formatDate(details?.date)}
            </DetailsItem>
          )}
          {details?.tools && (
            <DetailsItem key='tools' type='tools'>
              {details?.tools}
            </DetailsItem>
          )}
          {details?.name && (
            <DetailsItem key='client' type='client'>
              {!details.url ? (
                details?.name
              ) : (
                <Link href={details?.url} target='_blank' rel='noopener noreferrer'>
                  {details?.name}
                </Link>
              )}
            </DetailsItem>
          )}
          {details?.previewLabel && (
            <DetailsItem key='link' type='link'>
              {!details?.previewUrl ? (
                details?.previewLabel
              ) : (
                <Link href={details?.previewUrl} target='_blank' rel='noopener noreferrer'>
                  {details?.previewLabel}
                </Link>
              )}
            </DetailsItem>
          )}
          {categories && (
            <DetailsItem key='categories' type='categories'>
              {categoryResults
                .flat()
                .filter(
                  (category) =>
                    category &&
                    typeof category.id === 'string' &&
                    typeof category.title === 'string' &&
                    typeof category.slug === 'string',
                )
                .sort((a, b) => {
                  const aHasParent = !!a.parentCategory;
                  const bHasParent = !!b.parentCategory;
                  if (aHasParent === bHasParent) return 0;
                  return aHasParent ? 1 : -1;
                })
                .map((category, idx, arr) => (
                  <span key={category.id}>
                    <Link
                      href={`${getServerSideURL()}/categories/${category.slug}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {category.title}
                    </Link>
                    {idx < arr.length - 1 && ', '}
                  </span>
                ))}
            </DetailsItem>
          )}
        </DetailsList>
      </CardBody>
    </Card>
  );
};
