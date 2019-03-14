function setup(apiKey) {
  const win = window;
  const doc = document;
  const analytics = win.analytics || [];
  win.analytics = analytics;
  if (analytics.initialize) return;
  if (analytics.invoked) {
    return;
  }
  analytics.invoked = true;
  analytics.methods = [
    'trackSubmit',
    'trackClick',
    'trackLink',
    'trackForm',
    'pageview',
    'identify',
    'reset',
    'group',
    'track',
    'ready',
    'alias',
    'debug',
    'page',
    'once',
    'off',
    'on'
  ];
  analytics.factory = (method) => (...args) => {
    args.unshift(method);
    analytics.push(args);
    return analytics;
  };
  // eslint-disable-next-line
  for (const key of analytics.methods) {
    analytics[key] = analytics.factory(key);
  }
  analytics.load = (key) => {
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;
    const first = doc.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(script, first);
  };
  analytics.load(apiKey);
}

module.exports = setup;
