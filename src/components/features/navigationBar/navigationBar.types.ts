import type { IDrawerItems } from '@components/common/drawer/drawer.types';

interface RouteItem {
  path: string;
  title: string;
}
export interface NavigationBarProps {
  routes: RouteItem[];
  drawerItems?: IDrawerItems['items'];
}
