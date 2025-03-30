import { clsx } from 'clsx';
import style from './style.module.scss';
import { queryRelatedProjects } from '@/lib/utilities/queries/queryRelatedProjects';
import { Card, CardBody, CardTitle, CardImage, CardContent } from '@/components/ui/Card';
import { Carousel } from '@/components/ui/Carousel';
import type { RelatedProjectsBlockProps } from '@/payload-types';
import type { Project, Post } from '@/payload-types';

export type Props = {
  className?: string;
} & RelatedProjectsBlockProps;

export const RelatedProjectsBlock = async ({
  className,
  relatedCollection,
  relatedCategory,
  numberOfRelatedItems,
}: Props) => {
  const data = await queryRelatedProjects({
    collection: relatedCollection,
    category: relatedCategory,
    items: numberOfRelatedItems,
  });

  const projects = relatedCollection === 'projects' ? (data as Project[]) : (data as Post[]);

  return (
    <section className={clsx(className, style['related-projects'], 'section')}>
      {projects.length > 0 && (
        <Carousel
          disableAt={'(min-width: 64em)'}
          pagination
          buttonNavigation
          keyboardControls
          className={clsx(style['related-projects__container'], 'col-span-16')}
          wrapperClassName={clsx(
            style['related-projects__wrapper'],
            style[`related-projects__wrapper--grid-cols-${numberOfRelatedItems}`],
          )}
        >
          {projects.map((item) => (
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
        </Carousel>
      )}
    </section>
  );
};
