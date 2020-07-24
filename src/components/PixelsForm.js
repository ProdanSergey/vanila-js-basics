import { Pixels } from '../models/Pixels';
import { Form } from '../models/Form';

class PixelsForm {
  constructor() {
    this.ref = null;

    this.form = new Form({
      fields: [
        {
          label: 'Search',
          placeholder: 'Search...',
          name: 'search_value',
          className: 'fixed',
          handler: {
            type: 'submit',
            label: 'Search',
          },
        },
        {
          label: 'Result',
          type: 'custom',
          name: 'search_result',
          ref: (node) => {
            this.ref = node;
          },
        },
      ],
      options: {
        className: 'pixels',
        onSubmit: this.onSubmit,
      },
    }).create();

    this.pixels = new Pixels(this.ref);
  }

  onSubmit = ({ elements: { search_value: searchValue } }) => {
    this.pixels.load(searchValue.value);
  };

  render() {
    return this.form;
  }
}

export { PixelsForm };
