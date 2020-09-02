import { useModelWrapper } from '@/core/utils/forms.utils';
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const Radio = defineComponent({
  props: {
    modelValue: Boolean,
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const checked = ref(true);
    const value = useModelWrapper(props, emit);

    // const handleChange = (e: any) => {
    //   console.log('change!');
    //   value.value = true;
    //   console.log(props.modelValue);
    // };

    onMounted(() => {
      checked.value = props.modelValue ?? false;
      value.value = props.modelValue;
    });

    return { value, checked };
  },
});

export default Radio;
