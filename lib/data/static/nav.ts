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
  {
    id: 2,
    name: 'Vote',
    path: '/vote',
  },
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
  },
  {
    id: 1,
    name: 'General Feedback',
    path: '/',
    icon: '/assets/icons/menu/ico.menu.feedback.svg',
  },
  {
    id: 2,
    name: 'Bug Report',
    path: '/',
    icon: '/assets/icons/menu/ico.menu.bug.svg',
  },
  {
    id: 3,
    name: 'User',
    path: '/',
    icon: '/assets/icons/menu/ico.menu.user.svg',
  },
  {
    id: 4,
    name: 'Governance',
    path: '/',
    icon: '/assets/icons/menu/ico.menu.governance.svg',
  },
];

export const wallets: WalletItemType[] = [
  {
    id: 0,
    name: 'Metamask',
    icon: '/assets/icons/wallet/ico.wallet.metamask.svg',
  },
  {
    id: 1,
    name: 'Wallet Connect',
    icon: '/assets/icons/wallet/ico.wallet.walletconnect.svg',
  },
];