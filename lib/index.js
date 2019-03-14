const setup = require('./setup');
const vueDirective = require('./vue-directive');

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

module.exports = {
  setup,
  identify,
  trackPageView,
  trackEvent,
  vueDirective
};
