const { messages } = require('constants');
const { name } = require('../package');

const clone = (properties) => {
  return Object.assign({}, properties);
};

const formatMsg = (msg = '') => {
  return `${name}-> ${msg}`;
};

const warn = (msg = '') => {
  console.warn(formatMsg(msg));
};

const getSegment = () => {
  const segment = window.analytics;
  if (!segment) {
    warn(messages.missingSegment);
  }
  return segment;
};

const getArgs = (binding) => {
  const { arg: event, value: { message, data } } = binding;
  return { event, message, data };
};

module.exports = {
  clone,
  formatMsg,
  warn,
  getSegment,
  getArgs
};
