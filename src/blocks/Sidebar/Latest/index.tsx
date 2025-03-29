import { SidebarLatestBlockProps } from '@/payload-types';

export type Props = {
  className?: string;
} & SidebarLatestBlockProps;

export const SidebarLatestBlock = ({ className }: Props) => {
  return (
    <section className={className}>
      <h2 className='sidebar__block-title'>Latest Posts</h2>
      <ul className='sidebar__block-list'>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
      </ul>
    </section>
  );
};
