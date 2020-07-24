import { Page } from '../components/layout/Page';
import { PixelsForm } from '../components/PixelsForm';

const form = new PixelsForm();

export const PixelsPage = new Page({
  title: 'Pixels',
  className: 'pixels',
  children: form.render(),
});
