export const getNavigationItems = (game: string | undefined) => {
  const navigationItems = [
    { path: `/${game}/form`, title: 'formularz' },
    { path: `/${game}/results`, title: 'wyniki' },
    { path: `/${game}/rules`, title: 'zasady' },
  ];

  return navigationItems;
};
