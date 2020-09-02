import IconButton from '@/components/IconButton/IconButton.vue';
import { useModelWrapper } from '@/core/utils/forms.utils';
import {
  getLabelOfModelOptionSimpleValue,
  Options,
  splitOptionsIntoGroups,
} from '@/core/utils/options.utils';
import { defineComponent, PropType, ref } from 'vue';

/**
 * PropertyCreateTypeInput
 *
 * Outputs
 * v-model="subType"
 * v-model:group="type"
 */
const PropertyCreateTypeInput = defineComponent({
  components: {
    IconButton,
  },
  props: {
    type: {
      type: Object as PropType<{ type: string; subType: string }>,
    },
    modelValue: {
      type: Object as PropType<{ type: string; subType: string }>,
    },
    options: {
      type: Array as PropType<Options[]>,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const elref = ref(null);
    const isOpen = ref(false);
    const groupOpenIndex = ref(-1);

    const value = useModelWrapper(props, emit);

    const opts = splitOptionsIntoGroups(props, 'options', 'group');
    const displayValue = getLabelOfModelOptionSimpleValue(props, 'options', 'subType');

    const onTrigger = () => {
      isOpen.value = !isOpen.value;
    };

    const swapTab = (index: number, name: string) => {
      groupOpenIndex.value = groupOpenIndex.value === index ? -1 : index;

      value.value = {
        type: name,
        subType: opts.value[name][0].value,
      };
    };

    const setValue = (newVal: string) => {
      value.value = {
        type: value.value.type,
        subType: newVal,
      };
    };

    return {
      value,
      onTrigger,
      isOpen,
      opts,
      groupOpenIndex,
      displayValue,
      swapTab,
      elref,
      setValue,
    };
  },
});

export default PropertyCreateTypeInput;
