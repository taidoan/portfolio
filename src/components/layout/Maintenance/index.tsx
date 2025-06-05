import type { TypedEditorState } from '@payloadcms/richtext-lexical';

import clsx from 'clsx';
import style from './style.module.scss';
import { RichText } from '@/components/ui/RichText';

export type MaintenanceBlockProps = {
  className?: string;
  message?: TypedEditorState;
};

export const MaintenanceBlock = async ({ className, message }: MaintenanceBlockProps) => {
  const hasValidMessage =
    Array.isArray(message?.root?.children) &&
    message.root.children.some((child) => {
      if (child.type !== 'paragraph') return true;

      if ('children' in child && Array.isArray(child.children) && child.children.length > 0) {
        return true;
      }

      return false;
    });

  return (
    <div className={clsx(className, style.maintenance, 'section')}>
      {hasValidMessage ? (
        <RichText data={message} />
      ) : (
        <>
          <h2 className={style['maintenance__title']}>Under Maintenance</h2>
          <p className={style['maintenance__message']}>
            We&apos;re performing some maintenance at the moment. We&apos;ll be back soon!
          </p>
        </>
      )}
    </div>
  );
};
