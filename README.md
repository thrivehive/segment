# `@thrivehive/segment`

[![npm version](https://badge.fury.io/js/%40thrivehive%2Fsegment.svg)](https://badge.fury.io/js/%40thrivehive%2Fsegment)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Implements Segment.io `identify`, `page`, and `track` methods, and adds a `setup` function to inject the segment script into your page with your write key.

A [Vue directive](#vue-directive) is also included to make event tracking easier.

## Installation

```bash
npm install @thrivehive/segment
```

## Setup

Inject the official segment.js script into the page with your write key: 

```js
import { setup } from '@thrivehive/segment';

setup('<YOUR WRITE KEY>');
```

## Tracking methods

### identity

Wrapper for `analytics.identity`:

```js
// Foo.vue
import { identify } from '@thrivehive/segment';

const user = {
  name: 'Jane Doe',
  active: true
}

export default {
  mounted() {
    identify(user.name, {
      active: user.active
    });
  }
}
```

### trackEvent

Wrapper for `analytics.track`:

```js
// Foo.vue
import { trackEvent } from '@thrivehive/segment';

export default {
  methods: {
    foo() {
      trackEvent('Button clicked', properties);
    }
  }
}
```

### trackPageView

Wrapper for `analytics.page`:

```js
// router.js
import Vue from 'vue';
import Router from 'vue-router';
import { trackPageView } from '@thrivehive/segment';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    }
  ]
});

router.afterEach((to) => {
  trackPageView(to.name, to.query);
});

```

## Vue directive

More info about [Vue directives](https://vuejs.org/v2/guide/custom-directive.html).

The directive argument is the event name you want to listen for. Note that this is a native DOM event listener, not a Vue event.

Setup the directive:

```js
import Vue from 'vue';
import { VueSegment } from '@thrivehive/segment';

Vue.directive(VueSegment.name, VueSegment);
```

Example usage with button:

```html
<template>
  <div>
    <button
      v-segment:click="{
        message: 'User clicked button'
      }"
    >
      Click me
    </button>
  </div>
</template>
```

Example usage with form:

```html
<template>
  <div>
    <form
      v-segment:submit="{
        message: 'User submitted form',
        data: trackingInfo
      }"
    >
      <input type="text" v-model="value" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: null
  }),
  computed: {
    trackingInfo() {
      return {
        value: this.value
      }
    }
  }
}
</script>
```

**Note:** Data passed to directive must be an object reference, it is the only way to guarantee reactive data stays current.
