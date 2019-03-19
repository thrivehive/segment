module.exports = {
  directiveName: 'segment',
  methods: [
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
  ],
  messages: {
    missingArg: 'No event argument was passed to directive. Did you mean to track the page?',
    missingSegment: 'Segment instance missing',
    invalidData: 'Data should be an object'
  }
};
