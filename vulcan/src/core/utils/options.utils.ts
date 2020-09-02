import { groupBy } from 'lodash-es';
import { computed } from 'vue';

export interface Options {
  label: string;
  value: string;
  group: string;

  [x: string]: unknown;
}

export const getLabelOfModelOptionSimpleValue = (
  props: any,
  propItem: string,
  valueParam?: string
) =>
  computed(() => {
    const options = props[propItem];
    const val = valueParam ? props.modelValue[valueParam] : props.modelValue;
    const label = options.find((opt: any) => opt.value === val)?.label;

    return label;
  });

export const splitOptionsIntoGroups = (props: any, itemToSplit: string, groupParam: string) =>
  computed(() => {
    const grouped = groupBy(props[itemToSplit], groupParam);
    return grouped;
  });
