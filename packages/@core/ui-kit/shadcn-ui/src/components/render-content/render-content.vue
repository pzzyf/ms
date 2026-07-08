<script lang="ts">
import type { Component, PropType } from 'vue';

import { isFunction, isObject, isString } from '@ms-core/shared/utils';

import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'RenderContent',
  props: {
    content: {
      default: undefined as
        PropType<(() => any) | Component | string> | undefined,
      type: [Object, String, Function],
    },
    renderBr: {
      default: false,
      type: Boolean,
    },
  },
  setup(properties, { attrs, slots }) {
    return () => {
      if (!properties.content) {
        return null;
      }
      const isComponent =
        (isObject(properties.content) || isFunction(properties.content)) &&
        properties.content !== null;
      if (!isComponent) {
        if (properties.renderBr && isString(properties.content)) {
          const lines = properties.content.split('\n');
          const result = Array.from(lines.entries(), ([index, line]) =>
            h('p', { key: index }, line),
          );
          return result;
        }
        return properties.content;
      }
      return h(
        properties.content as never,
        {
          ...attrs,
          props: {
            ...properties,
            ...attrs,
          },
        },
        slots,
      );
    };
  },
});
</script>
