const { messages, directiveName } = require('./constants');
const setup = require('./setup');

const {
  warn,
  clone,
  getSegment,
  getArgs,
  getSegmentIdFromCookie
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
  install(Vue, options) {
    setup(options.key);
    Vue.directive(this.name, this);
  },
  bind($el, binding, { componentInstance }) {
    const {
      event,
      message,
      data,
      modifiers
    } = getArgs(binding);

    let output = message;

    if (typeof binding.value === 'string') {
      output = binding.value;
    } else if (data && typeof data !== 'object') {
      warn(messages.invalidData);
    }
    if (!event) {
      warn(messages.missingArg);
    }
    if (modifiers.native) {
      $el.addEventListener(event, () => {
        trackEvent(output, data);
      });
    } else {
      componentInstance.$on(event, () => {
        trackEvent(output, data);
      });
    }
  }
};

module.exports = {
  setup,
  identify,
  trackPageView,
  trackEvent,
  VueSegment,
  getSegmentIdFromCookie
};
