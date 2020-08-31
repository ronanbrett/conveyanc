/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */
import { VNode, Directive, DirectiveBinding, nextTick } from 'vue';
import { isEqual } from 'lodash';

interface HtmlElementWithCheck extends HTMLElement {
  _vue_visibilityState?: VisiblityChecker;
}

interface VisiblityOptions {
  threshold?: true;
  callback: any;
  intersection: IntersectionObserverInit;
  once: boolean;
}

function throttle(callback: Function, delay: number, options: { leading?: any } = {}) {
  let timeout: any;
  let lastState: any;
  let currentArgs: any;
  const throttled = (state: any, ...args: any[]) => {
    currentArgs = args;
    if (timeout && state === lastState) return;
    let { leading } = options;
    if (typeof leading === 'function') {
      leading = leading(state, lastState);
    }
    if ((!timeout || state !== lastState) && leading) {
      callback(state, ...currentArgs);
    }
    lastState = state;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(state, ...currentArgs);
      timeout = 0;
    }, delay);
  };
  throttled._clear = () => {
    clearTimeout(timeout);
    timeout = null;
  };
  return throttled;
}

function processOptions(value: VisiblityOptions): VisiblityOptions {
  let options;
  if (typeof value === 'function') {
    // Simple options (callback-only)
    options = {
      callback: value,
    };
  } else {
    // Options object
    options = value;
  }
  return options as VisiblityOptions;
}

class VisiblityChecker {
  frozen = false;
  observer?: IntersectionObserver;
  callback?: any;

  oldResult: boolean | undefined = false;

  get threshold() {
    return (this.options.intersection && this.options.intersection.threshold) || 0;
  }

  constructor(
    private el: HtmlElementWithCheck,
    private options: VisiblityOptions,
    private vnode: VNode
  ) {
    this.createObserver(options);
  }

  createObserver(options: VisiblityOptions) {
    if (this.frozen) {
      return;
    }

    this.options = processOptions(options);

    this.callback = (result: boolean, entry: IntersectionObserverEntry) => {
      this.options.callback(result, entry);
      if (result && this.options.once) {
        this.frozen = true;
        this.destroyObserver();
      }
    };

    this.oldResult = undefined;

    this.observer = new IntersectionObserver((entries) => {
      let entry = entries[0];

      if (entries.length > 1) {
        const intersectingEntry = entries.find((e) => e.isIntersecting);
        if (intersectingEntry) {
          entry = intersectingEntry;
        }
      }

      if (this.callback) {
        // Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
        const result = entry.isIntersecting && entry.intersectionRatio >= this.threshold;
        if (result === this.oldResult) return;
        this.oldResult = result;
        this.callback(result, entry);
      }
    }, this.options.intersection);

    nextTick(() => {
      if (this.observer) {
        this.observer.observe(this.el);
      }
    });
  }

  destroyObserver() {
    console.log('destroy');

    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    // Cancel throttled call
    if (this.callback && this.callback._clear) {
      this.callback._clear();
      this.callback = undefined;
    }
  }
}

export const setup = (el: HtmlElementWithCheck, { value }: DirectiveBinding, vnode: VNode) => {
  if (!value) {
    return;
  }

  if (typeof IntersectionObserver === 'undefined') {
    console.warn(
      '[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill'
    );
  } else {
    const state = new VisiblityChecker(el, value, vnode);
    el._vue_visibilityState = state;
  }
};

export const CheckInViewport: Directive = {
  mounted: (el: HtmlElementWithCheck, bindings: DirectiveBinding, vnode: VNode) => {
    console.log('mounted!');
    setTimeout(() => {
      setup(el, bindings, vnode);
    });
  },
  updated: (el: HtmlElementWithCheck, { value, oldValue }: DirectiveBinding, vnode: VNode) => {
    if (isEqual(value, oldValue)) {
      return;
    }
    const state = el._vue_visibilityState;
    if (!value && state) {
      state.destroyObserver();
      el._vue_visibilityState = undefined;
    } else {
      setup(el, { value } as DirectiveBinding, vnode);
    }
  },

  unmounted: (el: HtmlElementWithCheck) => {
    console.log('before unmount');
    const state = el._vue_visibilityState;
    if (state) {
      state.destroyObserver();
      el._vue_visibilityState = undefined;
    }
  },
};
