import { Page } from '../components/layout/Page';
import { BoxesForm } from '../components/BoxesForm';

const form = new BoxesForm();

export const BoxesPage = new Page({
  title: 'Boxes',
  className: 'boxes',
  children: form.render(),
});
