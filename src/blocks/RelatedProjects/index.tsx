import type { RelatedProjectsBlockProps } from '@/payload-types';
import type { Project, Post } from '@/payload-types';
import { queryRelatedProjects } from '@/lib/utilities/queries/queryRelatedProjects';
import { Card, CardBody, CardTitle, CardImage, CardContent } from '@/components/ui/Card';

export type Props = {
  className?: string;
} & RelatedProjectsBlockProps;

export const RelatedProjectsBlock = async ({
  className,
  relatedCollection,
  relatedCategory,
}: Props) => {
  const data = await queryRelatedProjects({
    collection: relatedCollection,
    category: relatedCategory,
  });

  const projects = relatedCollection === 'projects' ? (data as Project[]) : (data as Post[]);

  return (
    <section className={className}>
      {projects.length > 0 &&
        projects.map((item) => (
          <Card data={item} key={item.id} relation='projects' href={`${item.url}`}>
            <CardBody>
              <CardImage align='top' borderRadius='top' />
              <CardContent>
                <CardTitle />
                {relatedCollection === 'projects' && 'details' in item && (
                  <p>{item.details?.type}</p>
                )}
              </CardContent>
            </CardBody>
          </Card>
        ))}
    </section>
  );
};
