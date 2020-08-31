import IconButton from '@/components/IconButton/IconButton.vue';
import { useModelWrapper } from '@/core/utils/forms.utils';
import { groupBy } from 'lodash';
import { computed, defineComponent, PropType, ref } from 'vue';

interface Options {
  label: string;
  value: string;
  group: string;
}

const generateOptions = (props: any, itemToSplit: string, groupParam: string) =>
  computed(() => {
    const grouped = groupBy(props[itemToSplit], groupParam);
    return grouped;
  });

const getDisplayOption = (props: any, propItem: string) =>
  computed(() => {
    const options = props[propItem];
    const val = props.modelValue;
    return options.find((opt: any) => opt.value === val)?.label;
  });

const PropertyCreateTypeInput = defineComponent({
  components: {
    IconButton,
  },
  props: {
    modelValue: String,
    options: {
      type: Array as PropType<Options[]>,
      default: () => [
        { label: 'Apartment', value: 'APARTMENT', group: 'APARTMENTS' },
        { label: 'Duplex', value: 'DUPLEX', group: 'APARTMENTS' },
        { label: 'House', value: 'HOUSE', group: 'HOUSING' },
        { label: 'Land', value: 'LAND', group: 'LAND' },
      ],
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const groupOpenIndex = ref(0);
    const value = useModelWrapper(props, emit);
    const opts = generateOptions(props, 'options', 'group');

    const onTrigger = () => {
      isOpen.value = !isOpen.value;
    };

    const swapGroup = (index: number) => {
      groupOpenIndex.value = groupOpenIndex.value === index ? -1 : index;
    };

    const displayValue = getDisplayOption(props, 'options');

    return {
      value,
      onTrigger,
      isOpen,
      opts,
      groupOpenIndex,
      displayValue,
      swapGroup,
    };
  },
});

export default PropertyCreateTypeInput;
