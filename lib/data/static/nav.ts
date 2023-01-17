import { MenuItemType, NavItemType, WalletItemType } from '../../types/common';

export const navItems: NavItemType[] = [
  {
    id: 0,
    name: 'Products',
    path: '/',
  },
  {
    id: 1,
    name: 'Stake',
    path: '/stake',
  },
  // {
  //   id: 2,
  //   name: 'Vote',
  //   path: '/vote',
  // },
  {
    id: 3,
    name: 'Bond',
    path: '/bond',
  },
];

export const menuItems: MenuItemType[] = [
  {
    id: 0,
    name: 'Mozaic',
    path: '/',
    icon: '/assets/icons/menu/ico.menu.home.svg',
    link: true,
  },
  {
    id: 1,
    name: 'General Feedback',
    path: '',
    icon: '/assets/icons/menu/ico.menu.feedback.svg',
    link: false,
  },
  {
    id: 2,
    name: 'Bug Report',
    path: '',
    icon: '/assets/icons/menu/ico.menu.bug.svg',
    link: false,
  },
  {
    id: 3,
    name: 'Docs',
    path: 'https://docs.mozaic.finance/',
    icon: '/assets/icons/menu/ico.menu.user.svg',
    newWindow: true,
    link: true,
  },
  // {
  //   id: 4,
  //   name: 'Governance',
  //   path: '/',
  //   icon: '/assets/icons/menu/ico.menu.governance.svg',
  // },
];
