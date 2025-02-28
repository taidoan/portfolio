import type { Footer as FooterType, Social } from '@/payload-types';

export type FooterProps = {
  footer: FooterType;
  social: Social;
};

export const Footer = ({ footer, social }: FooterProps) => {
  return <footer>Footer Test</footer>;
};
