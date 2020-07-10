// TODO: Add loading state;

import {
  elementFactory,
  setElementAttributes,
  getElementClassNameFromArray,
} from '../helpers';

class Form {
  constructor({ fields = [], handlers = [], options = {} }) {
    this.fields = fields;
    this.handlers = handlers;
    this.options = {
      className: '',
      onSubmit: () => void 0,
      ...options,
    };
  }

  createLabel({ label: innerText, name }) {
    return elementFactory('label', {
      attrs: {
        htmlFor: name,
        className: 'form-label',
        innerText,
      },
    });
  }

  createInput({ type = 'text', name, ref, placeholder, readonly = false }) {
    let input;
    const className = 'input';

    switch (type) {
      case 'custom':
        input = elementFactory('div', {
          attrs: {
            className: `${className} input--custom`,
          },
        });
        break;
      case 'textarea':
        input = elementFactory('textarea', {
          attrs: {
            className: `${className} input--textarea`,
            readonly,
          },
        });
        break;
      default:
        input = elementFactory('input', {
          attrs: { className, readonly, type },
        });
        break;
    }

    setElementAttributes(input, {
      id: name,
      name,
      ...(placeholder && { placeholder }),
    });

    ref && ref(input);

    return input;
  }

  createInputButton({
    label: innerText,
    type = 'button',
    event = 'click',
    disabled = false,
    callback,
    color = 'primary',
    className = '',
  }) {
    const button = elementFactory('button', {
      attrs: {
        type,
        className: `btn btn-${color} btn-companion ${className}`,
        innerText,
        disabled,
      },
    });

    if (callback) {
      button.addEventListener(event, (e) => {
        e.preventDefault();

        callback(e.target.form);
      });
    }

    return button;
  }

  createButton({
    label: innerText,
    disabled = false,
    type = 'submit',
    color = 'primary',
  }) {
    return elementFactory('button', {
      attrs: {
        type,
        className: `btn btn-${color}`,
        innerText,
        disabled,
      },
    });
  }

  createFilds() {
    const wrapper = elementFactory('div', {
      attrs: {
        className: 'form-body',
      },
    });

    return this.fields.reduce((wrapper, data) => {
      const field = elementFactory('div', {
        attrs: {
          className: getElementClassNameFromArray([
            'form-field',
            data.className,
          ]),
        },
      });

      if (data.label) {
        const label = this.createLabel(data);

        field.append(label);
      }

      const input = this.createInput(data);

      if (data.handler) {
        const wrapper = elementFactory('div', {
          attrs: {
            className: 'input-wrapper',
          },
        });

        const handler = this.createInputButton(data.handler);

        wrapper.append(input);
        wrapper.append(handler);

        field.append(wrapper);
      } else {
        field.append(input);
      }

      wrapper.append(field);

      return wrapper;
    }, wrapper);
  }

  createHandlers(form) {
    const container = elementFactory('div', {
      attrs: {
        className: 'form-controls',
      },
    });

    return this.handlers.reduce(
      (container, { callback, event = 'submit', ...data }) => {
        const button = this.createButton(data);

        if (callback) {
          form.addEventListener(event, (e) => {
            e.preventDefault();

            callback(form);
          });
        }

        container.append(button);

        return container;
      },
      container,
    );
  }

  create() {
    const form = elementFactory('form', {
      attrs: {
        ...(this.options.id && { id: this.options.id }),
        className: getElementClassNameFromArray([
          'form',
          this.options.className,
        ]),
      },
    });

    const fields = this.createFilds();
    const handlers = this.createHandlers(form);

    if (this.options.onSubmit) {
      form.onsubmit = () => {
        this.options.onSubmit(form);

        return false;
      };
    }

    fields.hasChildNodes() && form.append(fields);
    handlers.hasChildNodes() && form.append(handlers);

    return form;
  }
}

export { Form };
