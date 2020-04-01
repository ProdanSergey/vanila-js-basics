import 'basiclightbox/src/styles/main.scss';
import './styles/style.scss';

import {BuilderForm} from './components/BuilderForm';
import {BoxesForm} from './components/BoxesForm';
import {PixelsForm} from './components/PixelsForm';

const builder_form = new BuilderForm(document.getElementById('string-builder'));
const boxes_form = new BoxesForm(document.getElementById('boxes'));
const pixels_form = new PixelsForm(document.getElementById('pixels'));

builder_form.render();
boxes_form.render();
pixels_form.render();

