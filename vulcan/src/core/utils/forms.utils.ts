/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from 'vue';

export function useModelWrapper(
  props: any,
  emit: (event: string, ...args: any[]) => void,
  name = 'modelValue'
) {
  return computed({
    get: () => props[name],
    set: (value) => emit(`update:${name}`, value),
  });
}
