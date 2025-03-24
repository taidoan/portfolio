import type { Project } from '@/payload-types';
import { Card, CardBody } from '@/components/ui/Card';
import { DetailsList, DetailsItem } from './components';
import Link from 'next/link';

export type ProjectDetailsProps = {
  className?: string;
  data: Pick<Project, 'details'>;
};

/**
 * This component renders the project details section of a project page.
 * @param {ProjectDetailsProps} props - The props for the ProjectDetails component.
 * @returns {React.ReactElement} The rendered component.
 * @example
 * <ProjectDetails data={project} />
 */
export const ProjectDetails = ({ className, data }: ProjectDetailsProps) => {
  const { details } = data;

  return (
    <Card className={className}>
      <CardBody padding='small'>
        <DetailsList>
          {details?.date && (
            <DetailsItem key='date' type='date'>
              {new Date(details?.date).toLocaleDateString()}
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
        </DetailsList>
      </CardBody>
    </Card>
  );
};
