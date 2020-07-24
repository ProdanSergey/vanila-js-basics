import { Boxes } from '../models/Boxes';
import { Form } from '../models/Form';

class BoxesForm {
  constructor() {
    this.ref = null;

    this.form = new Form({
      fields: [
        {
          label: 'Value',
          type: 'number',
          name: 'boxes_value',
        },
        {
          label: 'Result',
          type: 'custom',
          name: 'boxes_result',
          ref: this.onRef,
        },
      ],
      handlers: [
        {
          label: 'Submit',
          callback: this.onSubmit,
        },
        {
          label: 'Reset',
          event: 'reset',
          type: 'reset',
          callback: this.onReset,
          color: 'secondary',
        },
      ],
      options: {
        className: 'boxes',
      },
    }).create();

    this.boxes = new Boxes(this.ref);
  }

  onRef = (node) => {
    node.classList.add('boxes-wrapper');
    this.ref = node;
  };

  onSubmit = ({ elements: { boxes_value: boxesValue } }) => {
    this.boxes.createBoxes(boxesValue.valueAsNumber);
  };

  onReset = () => this.boxes.destroy();

  render() {
    return this.form;
  }
}

export { BoxesForm };
