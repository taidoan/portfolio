import { Footer as FooterClient } from './footer';
import { FooterProps } from './footer';

const Footer = async ({ footer, social }: FooterProps) => {
  return <FooterClient footer={footer} social={social} />;
};

export default Footer;
