import {StringBuilder} from '../models/StringBuilder';
import {Form} from '../models/Form';

class BuilderForm {
  constructor(template) {
    this.template = template;

    const form = new Form({
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
        }
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
        }
      ],
      options: {
        className: 'strings',
      }
    })

    this.form = form.create();
  }

  onSubmit = form => {
    const {elements: {string_builder_value, string_builder_result}} = form;
    
    const builder = new StringBuilder(string_builder_value.value);

    string_builder_result.value = builder
      .append('^')
      .prepend('^')
      .pad('=')
      .toString();
  }

  render() {
    this.template.append(this.form);
  }
}

export { BuilderForm };