import React from 'react';
import Layout from 'terra-layout';
import classNames from 'classnames/bind';
import ContentPage from './ContentPage';
import MenuBar from './MenuBar';
import Toolbar from './Toolbar';
import styles from './mainpage.scss';

const cx = classNames.bind(styles);

const Loginform = () => (
  <Layout
    header={<Toolbar />}
    menu={<MenuBar />}
    menuText="Menu"
    className={cx('layout-example')}
  >
    <ContentPage />
  </Layout>
);

export default Loginform;