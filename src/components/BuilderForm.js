import { StringBuilder } from '../models/StringBuilder';
import { Form } from '../models/Form';

class BuilderForm {
  constructor() {
    this.form = new Form({
      fields: [
        {
          label: 'Value',
          type: 'text',
          name: 'string_builder_value',
        },
        {
          label: 'Result',
          type: 'textarea',
          name: 'string_builder_result',
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
          color: 'secondary',
        },
      ],
      options: {
        className: 'strings',
      },
    }).create();
  }

  onSubmit = (form) => {
    const {
      elements: {
        string_builder_value: stringBuilderValue,
        string_builder_result: stringBuilderResult,
      },
    } = form;

    const builder = new StringBuilder(stringBuilderValue.value);

    stringBuilderResult.value = builder
      .append('^')
      .prepend('^')
      .pad('=')
      .toString();
  };

  render() {
    return this.form;
  }
}

export { BuilderForm };
