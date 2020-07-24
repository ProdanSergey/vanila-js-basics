import { Page } from '../components/layout/Page';
import { BuilderForm } from '../components/BuilderForm';

const form = new BuilderForm();

export const BuilderPage = new Page({
  title: 'String Builder',
  className: 'string-builder',
  children: form.render(),
});
