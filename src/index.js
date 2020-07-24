import './styles/style.scss';

import { App } from './components/layout/App';
import { history } from './history';

new App({ title: 'JS Basics', history }).render(
  document.getElementById('root'),
);
