const pkgname = require('../package').name;

const formatMsg = (msg = '') => {
  return `${pkgname}-> ${msg}`;
};

module.exports.formatMsg = formatMsg;

const warn = (msg = '') => {
  console.warn(formatMsg(msg));
};

module.exports.warn = warn;
