import invertColor from 'invert-color';
import { safeSet } from './functions';

export const getRandomHex = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .slice(0, 3)}`;
};

export const getInvertedHex = (hex) => {
  return invertColor(hex, true);
};

export const setElementAttributes = (element, attrs, path) => {
  if (attrs) {
    Object.entries(attrs).forEach(([prop, value]) => {
      value && safeSet(element, path ? `${path}.${prop}` : prop, value);
    });
  }
};

export const getElementClassNameFromArray = (classList = []) => {
  return classList
    .reduce((classNames, className) => {
      return className ? `${classNames} ${className}` : classNames;
    }, '')
    .trim();
};

export const elementFactory = (
  tagName = 'div',
  { attrs, styles, handlers = {} },
) => {
  const element = document.createElement(tagName);

  setElementAttributes(element, attrs);
  setElementAttributes(element, styles, 'style');

  Object.entries(handlers).forEach(
    ([eventType, { handler, options = false }]) => {
      element.addEventListener(eventType, handler, options);
    },
  );

  return element;
};

export const getFragment = () => document.createDocumentFragment();

export const appendChildren = (...[parent = getFragment(), ...children]) => {
  children.flat().forEach((node) => {
    node && parent.append(node);
  });

  return parent;
};
