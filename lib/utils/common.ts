export const activeChecker = (currentItem: any, activeItem: any) => {
  if (currentItem === activeItem) {
    return 'active';
  }
  return '';
};
