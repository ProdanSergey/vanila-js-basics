import './styles/style.scss';

import { BuilderForm } from './components/BuilderForm';
import { BoxesForm } from './components/BoxesForm';
import { PixelsForm } from './components/PixelsForm';

const builderForm = new BuilderForm(document.getElementById('string-builder'));
const boxesForm = new BoxesForm(document.getElementById('boxes'));
const pixelsForm = new PixelsForm(document.getElementById('pixels'));

builderForm.render();
boxesForm.render();
pixelsForm.render();
