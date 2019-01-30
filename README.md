# `@thrivehive/segment`
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Implements Segment.io `identify`, `page`, and `track` methods.

## Setup
Include the Segment script you got from  in your `head` tag. If you do not want segment to track every single page view, take out `analytics.page()` at the end.

## Example
```js
// Foo.vue
import { identify, trackPageView, trackEvent } from '@thrivehive/segment';

export default {
  created() {
    identify(name, properties);
    trackPageView('foo', properties);
  },
  methods: {
    foo() {
      trackEvent('Button Clicked', properties);
    }
  }
}
```
