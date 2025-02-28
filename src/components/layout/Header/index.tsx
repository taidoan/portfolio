import { Header as HeaderClient } from './header';
import { HeaderProps } from './header';

const Header = async ({ data, social }: HeaderProps) => {
  return <HeaderClient data={data} social={social} />;
};

export default Header;
