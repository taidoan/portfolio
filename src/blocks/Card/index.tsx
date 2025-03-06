import type { CardBlockProps, Project, Service } from '@/payload-types';
import style from '@components/ui/Card/style.module.scss';
import clsx from 'clsx';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { Card, CardTitle, CardBody, CardImage, CardContent } from '@/components/ui/Card';
import { RichText } from '@components/ui/RichText';

export type Props = {
  className?: string;
} & CardBlockProps;

export const CardBlock = async ({
  relationTo,
  relatedProject,
  relatedService,
  title,
  content,
  projectType,
  cardImage,
  className,
  serviceContent,
  textAlign,
  insideContainer,
}: Props) => {
  const payload = await getPayload({ config: configPromise });
  const isProject = relationTo === 'projects';
  const isService = relationTo === 'services';

  let project: Project | undefined = undefined;
  let service: Service | undefined = undefined;
  let image = cardImage?.image;

  if (isProject) {
    project = await payload.findByID({
      collection: 'projects',
      id: (relatedProject as Project)?.id,
    });
    image = project?.thumbnail;
  }

  if (isService) {
    service = await payload.findByID({
      collection: 'services',
      id: (relatedService as Service)?.id,
    });
    image = service?.serviceImage;
  }
  const cardImageClass = clsx({ [`${style['image-type--service']}`]: isService });

  const imageUrl = typeof image === 'string' ? image : image?.filename;
  const imageAlt = typeof image !== 'string' ? image?.alt || '' : '';

  const renderImage = (position: 'outside' | 'inside', align?: 'top' | 'bottom') => {
    if (
      imageUrl &&
      cardImage?.imagePosition === position &&
      (!align || cardImage?.imageAlign === align)
    ) {
      return (
        <CardImage
          src={imageUrl}
          alt={imageAlt}
          borderRadius={isProject && relatedProject ? 'top' : cardImage?.imageBorderRadius}
          width={isService && typeof image !== 'string' ? image?.width : undefined}
          height={isService && typeof image !== 'string' ? image?.height : undefined}
          className={cardImageClass}
          align={align || (isProject && relatedProject ? 'top' : undefined)}
        />
      );
    }
  };

  return (
    <Card
      href={
        isProject
          ? `/${relationTo}/${project?.slug}`
          : isService
            ? `/${relationTo}#${service?.serviceCategoryTitle}`
            : undefined
      }
      relation={relationTo}
      textAlign={textAlign}
      className={className}
    >
      {renderImage('outside')}
      <CardBody>
        {renderImage('inside', 'top')}
        <CardContent insideContainer={relationTo === 'services' || insideContainer === 'yes'}>
          <CardTitle>
            {isProject ? project?.title : isService ? service?.serviceCategoryTitle : title}
          </CardTitle>
          {isProject && projectType ? (
            <p>{projectType}</p>
          ) : (
            project?.details?.type && <p>{project.details.type}</p>
          )}

          {isService && serviceContent ? (
            <RichText data={serviceContent} />
          ) : (
            service?.serviceCategoryDescription && (
              <RichText data={service?.serviceCategoryDescription} />
            )
          )}
          {!isProject && !isService && content && <RichText data={content} />}
        </CardContent>
        {renderImage('inside', 'bottom')}
      </CardBody>
    </Card>
  );
};
