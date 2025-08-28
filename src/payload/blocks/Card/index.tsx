import type { CardBlockProps, Project, Service, Post } from '@/payload-types';
import style from '@/components/ui/Card/style.module.scss';
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
  relatedPost,
  title,
  content,
  projectType,
  cardImage,
  className,
  serviceContent,
  postContent,
  textAlign,
  insideContainer,
}: Props) => {
  const payload = await getPayload({ config: configPromise });
  const isProject = relationTo === 'projects';
  const isService = relationTo === 'services';
  const isPost = relationTo === 'posts';

  let project: Project | undefined = undefined;
  let service: Service | undefined = undefined;
  let post: Post | undefined = undefined;
  let image = cardImage?.image;

  if (isProject) {
    project = await payload.findByID({
      collection: 'projects',
      id: (relatedProject as Project)?.id,
    });
    if (!project) {
      console.warn('Project not found');
    }
    image = project?.thumbnail;
  }

  if (isPost) {
    post = await payload.findByID({
      collection: 'posts',
      id: (relatedPost as Post)?.id,
    });
    if (!post) {
      console.warn('Post not found');
    }
    image = post?.thumbnail;
  }

  if (isService) {
    service = await payload.findByID({
      collection: 'services',
      id: (relatedService as Service)?.id,
    });
    if (!service) {
      console.warn('Service not found');
    }
    image = service?.image;
  }

  const cardImageClass = clsx({ [`${style['card__image-type--service']}`]: isService });

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
    return null;
  };

  return (
    <Card
      href={isProject ? `${project?.url}` : isService ? `${service?.url}` : undefined}
      relation={relationTo}
      textAlign={textAlign}
      className={className}
    >
      {renderImage('outside')}
      <CardBody>
        {renderImage('inside', 'top')}
        <CardContent insideContainer={relationTo === 'services' || insideContainer === 'yes'}>
          <CardTitle>
            {isProject ? project?.title : isService ? service?.title : isPost ? post?.title : title}
          </CardTitle>
          {isProject && projectType ? (
            <p>{projectType}</p>
          ) : project?.details?.type ? (
            <p>{project.details.type}</p>
          ) : null}

          {isService && serviceContent && serviceContent.root.children.length > 0 ? (
            <RichText data={serviceContent} />
          ) : service?.description ? (
            <RichText data={service?.description} />
          ) : null}

          {isPost && postContent && postContent.root.children.length > 0 ? (
            <RichText data={postContent} />
          ) : post?.excerpt ? (
            <p>{post?.excerpt}</p>
          ) : null}

          {!isProject && !isService && !isPost && content && <RichText data={content} />}
        </CardContent>
        {renderImage('inside', 'bottom')}
      </CardBody>
    </Card>
  );
};
