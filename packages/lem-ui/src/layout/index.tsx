import React from 'react';
import InternalLayout, { Header, Content, Footer, BasicProps } from './layout';

import Aside from './Sider';

interface LayoutType extends React.FC<BasicProps> {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Aside: typeof Aside;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Aside = Aside;

export default Layout;
