// TODO: Add loading state;

class Form {
  constructor({fields = [], handlers = [], options = {}}) {
    this.fields = fields;
    this.handlers = handlers;
    this.options = {
      className: '',
      onSubmit: () => void 0,
      ...options
    };
  }

  createLabel({label: innerText, name}) {
    const label = document.createElement('label');

    label.htmlFor = name;
    label.className = 'form-label';
    label.innerText = innerText;

    return label;
  }

  createInput({type = 'text', name, ref, placeholder, readonly = false}) {
    let input;

    switch (type) {
      case 'custom':
        input = document.createElement('div');
        input.className = 'input--custom';
        
        break;
      case 'textarea':
        input = document.createElement('textarea');
        input.className = 'input--textarea';
        input.readonly = readonly;

        break;
      default:
        input = document.createElement('input');
        input.type = type;
        input.readonly = readonly;

        break;
    }

    input.id = name;
    input.name = name;
  
    if (placeholder) {
      input.placeholder = placeholder;
    }

    input.className = `input ${input.className}`;

    ref && ref(input);

    return input;
  }

  createInputButton({label: innerText, type = 'button', event = 'click', disabled = false, callback, color = 'primary', className = ''}) {
    const button = document.createElement('button');
    
    button.type = type;
    button.className = `btn btn-${color} btn-companion ${className}`;
    button.innerText = innerText;
    button.disabled = disabled;

    if (callback) {
      button.addEventListener(event, e => {        
        e.preventDefault();

        callback(e.target.form);
      });
    }

    return button;
  }

  createButton({label: innerText, disabled = false, type='submit', color='primary'}) {
    const button = document.createElement('button');

    button.type = type;
    button.className = `btn btn-${color}`;
    button.innerText = innerText;
    button.disabled = disabled;

    return button;
  }

  createFilds() {    
    const wrapper = document.createElement('div');

    wrapper.className = 'form-body';

    return this.fields.reduce(
      (wrapper, data) => {
        const field = document.createElement('div');
        
        field.className = 'form-field';

        if (data.className) {
          field.classList.add(data.className)
        }

        if (data.label) {
          const label = this.createLabel(data);
          
          field.append(label);
        }

        const input = this.createInput(data);

        if (data.handler) {
          const wrapper = document.createElement('div');
          const handler = this.createInputButton(data.handler);

          wrapper.className = 'input-wrapper';

          wrapper.append(input);
          wrapper.append(handler);

          field.append(wrapper);
        } else {
          field.append(input);
        }

        wrapper.append(field);

        return wrapper;
      },
      wrapper,
    );
  }

  createHandlers(form) {
    const container = document.createElement('div');

    container.className = 'form-controls';

    return this.handlers.reduce(
      (container, {callback, event = 'submit', ...data}) => {
        const button = this.createButton(data);

        if (callback) {
          form.addEventListener(event, e => {
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
    const form = document.createElement('form');

    const fields = this.createFilds();
    const handlers = this.createHandlers(form);
    
    if (this.options.id) {
      form.id = this.id;
    } 

    form.className = 'form';
    
    if (this.options.className) {
      form.classList.add(this.options.className);
    }

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