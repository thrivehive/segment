const setup = require('./setup');
const { warn } = require('./utils');

function getSegment() {
  const segmentAnalytics = window.analytics;
  if (!segmentAnalytics) {
    console.warn('Missing Segment Library');
  }
  return segmentAnalytics;
}

function getProperties(properties) {
  return Object.assign({}, properties);
}

function identify(userId, properties) {
  const segment = getSegment();
  if (segment) {
    segment.identify(userId, getProperties(properties));
  }
}

function trackPageView(name, properties) {
  const segment = getSegment();
  if (segment) {
    if (name) {
      segment.page(name, properties);
    } else {
      segment.page();
    }
  }
}

function trackEvent(name, properties) {
  const segment = getSegment();
  if (segment) {
    segment.track(name, getProperties(properties));
  }
}

const VueSegment = {
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


module.exports = {
  setup,
  identify,
  trackPageView,
  trackEvent,
  VueSegment
};
