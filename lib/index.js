const { messages, directiveName } = require('./constants');
const setup = require('./setup');

const {
  warn,
  clone,
  getSegment,
  getArgs
} = require('./utils');

const identify = (userId, properties) => {
  const segment = getSegment();
  if (segment) {
    segment.identify(userId, clone(properties));
  }
};

const trackPageView = (name, properties) => {
  const segment = getSegment();
  if (segment) {
    if (name) {
      segment.page(name, clone(properties));
    } else {
      segment.page();
    }
  }
};

const trackEvent = (name, properties) => {
  const segment = getSegment();
  if (segment) {
    segment.track(name, clone(properties));
  }
};

const VueSegment = {
  name: directiveName,
  bind($el, binding, { componentInstance }) {
    const { event, message, data } = getArgs(binding);
    if (!event) {
      warn(messages.missingArg);
    }
    if (data && typeof data !== 'object') {
      warn(messages.invalidData);
    }
    componentInstance.$on(event, () => {
      trackEvent(message, data);
    });
  }
};

module.exports = {
  setup,
  identify,
  trackPageView,
  trackEvent,
  VueSegment
};
