import { HomePage } from './views/HomePage';
import { BuilderPage } from './views/BuilderPage';
import { BoxesPage } from './views/BoxesPage';
import { PixelsPage } from './views/PixelsPage';

export const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
  },
  {
    name: 'builder',
    path: '/builder',
    component: BuilderPage,
  },
  {
    name: 'boxes',
    path: '/boxes',
    component: BoxesPage,
  },
  {
    name: 'pixels',
    path: '/pixels',
    component: PixelsPage,
  },
];
