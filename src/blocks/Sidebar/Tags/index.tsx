import type { SidebarTagsBlockProps } from '@/payload-types';

export type Props = {
  className?: string;
} & SidebarTagsBlockProps;

export const SidebarTagsBlock = ({ className }: Props) => {
  return (
    <section className={className}>
      <h2 className='sidebar__block-title'>Tags</h2>
      <ul className='sidebar__block-list'>
        <li>Tag 1</li>
        <li>Tag 2</li>
        <li>Tag 3</li>
      </ul>
    </section>
  );
};
