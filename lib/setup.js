/* eslint-disable no-restricted-syntax */
const { methods } = require('./constants');

const setup = (apiKey) => {
  const analytics = window.analytics || [];
  window.analytics = analytics;
  if (analytics.initialize) return;
  if (analytics.invoked) {
    return;
  }
  analytics.invoked = true;
  analytics.methods = methods;
  analytics.factory = (method) => (...args) => {
    args.unshift(method);
    analytics.push(args);
    return analytics;
  };
  for (const key of analytics.methods) {
    analytics[key] = analytics.factory(key);
  }
  analytics.load = (key) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;
    const first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(script, first);
  };
  analytics.load(apiKey);
};

module.exports = setup;
