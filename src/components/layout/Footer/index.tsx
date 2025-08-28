import { Footer as FooterClient } from './footer';
import { FooterProps } from './footer';

const Footer = async ({ data, social }: FooterProps) => {
  return <FooterClient data={data} social={social} />;
};

export default Footer;
