import { Pixels } from '../models/Pixels';
import { Form } from '../models/Form';

class PixelsForm {
  constructor(template) {
    this.template = template;
    this.ref = null;

    const form = new Form({
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
    });

    this.form = form.create();
    this.pixels = new Pixels(this.ref);
  }

  onSubmit = ({ elements: { search_value: searchValue } }) => {
    this.pixels.load(searchValue.value);
  };

  render() {
    this.template.append(this.form);
  }
}

export { PixelsForm };
