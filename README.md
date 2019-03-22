# `@thrivehive/segment`

[![npm version](https://badge.fury.io/js/%40thrivehive%2Fsegment.svg)](https://badge.fury.io/js/%40thrivehive%2Fsegment)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Implements Segment.io `identify`, `page`, and `track` methods, and adds a `setup` function to inject the segment script into your page with your write key.

Also removes the need to paste the segment JS snippet into `<head>`.

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

## Vue plugin

`@thrivehive/segment` also includes a Vue plugin. The plugin will handle the `setup` function for you, and adds a Vue directive for easy event tracking. More info about [Vue directives](https://vuejs.org/v2/guide/custom-directive.html).

### Setup Vue plugin

Setup the plugin:

```js
import Vue from 'vue';
import { VueSegment } from '@thrivehive/segment';

Vue.use(VueSegment, {
  key: '<YOUR WRITE KEY>'
});
```

### Argument

The directive accepts a single argument, the `eventName` to listen for. By default, this is a Vue event listener, not native.

Example using button:

```html
<template>
  <button v-segment:click="'User clicked button'">
    Click me
  </button>
</template>
```

### Value

The expression passed to the directive may one of the following:

- `<string>`
  - **description**: Message to send to segment.io
- `<object>`
  - `message`
    - **type**: `<string>`
    - **description**: Message to send to segment.io
  - `data`
    - **type**: `<object>`
    - **description**: Data to send to segment.io, must be an object, data that may change should be a reference to a computed property that returns an object.

Example usage with message only:

```html
<template>
  <div v-segment:mouseenter="'User hovered over div'"></div>
</template>
```

Example usage with verbose syntax:

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

### Modifier

It is also possible to listen to a native event instead of a Vue event. Just like with normal Vue event listeners, you can use the `.native` modifier to use the native event listener:

```html
<template>
  <button v-segment:click.native="'User clicked button'">
    Click me
  </button>
</template>
```
