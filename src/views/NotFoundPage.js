import { Page } from '../components/layout/Page';
import { NotFound } from '../components/layout/NotFound';

export const NotFoundPage = new Page({
  title: 'Page Not Found',
  children: new NotFound().render(),
});
