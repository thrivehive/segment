const { warn } = require('./utils');
const { trackEvent } = require('./index');

module.exports = {
  name: 'segment',
  bind(el, binding) {
    const event = binding.arg;
    if (!event) {
      warn('No argument is present on segment directive. Did you mean to track the page?');
    }
    const { value: { message, data } } = binding;

    if (data && typeof data !== 'object') {
      warn('Data should be an object.');
    }

    el.addEventListener(event, () => {
      trackEvent(message, data);
    });
  }
};