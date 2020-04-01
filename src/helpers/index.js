export const range = (amount, initial, increment = 1) => {
  const range = [...Array(amount).keys()];

  const x =  initial ? range.map(index => (index + initial) * increment) : range;
  return x
};

export const getRandomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;